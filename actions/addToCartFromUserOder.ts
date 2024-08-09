"use server";

import { getProductById } from "@/data/getProductById";
import { db } from "@/lib/db";
import { TOrderItem } from "@/lib/type";
import { ExtenderUser } from "@/next-auth";
import { UserOrder } from "@prisma/client";

export interface addToCartFromUserOrderProps {
  orderId: string;
  user: ExtenderUser;
}

export const addToCartFromUserOrder = async ({
  user,
  orderId,
}: addToCartFromUserOrderProps) => {
  const userOrder = await db.userOrder.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!userOrder || userOrder.orderItems.length === 0) {
    return { error: "No order found or order has no items." };
  }

  if (!user) {
    return { error: "Please login to shop!" };
  }

  let cart = await db.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) {
    cart = await db.cart.create({
      data: {
        userId: user.id!,
      },
    });
  }

  try {
    const results = await Promise.all(
      userOrder?.orderItems.map(async (item) => {
        const { productId, quantity, sideOption, extraPrice, sizeOption } =
          item;
        const price = item.product.price;
        const itemTotal = quantity * (price + extraPrice);

        const existingItem = await db.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId,
            sizeOption,
            sideOption,
          },
        });

        if (existingItem) {
          await db.cartItem.update({
            where: {
              id: existingItem.id,
            },
            data: {
              quantity: existingItem.quantity + quantity,
            },
          });
        } else {
          await db.cartItem.create({
            data: {
              cartId: cart.id,
              productId,
              quantity,
              sideOption,
              sizeOption,
              extraPrice,
              itemTotal,
            },
          });
        }
      }),
    );
    return { results, success: "Item reordered." };
  } catch (e) {
    console.error(e);
    return { error: "Something went worng." };
  }
};
