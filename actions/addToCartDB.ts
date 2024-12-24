"use server";

import { ADDONSPRICE } from "@/data/products";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TaddCartToDB } from "@/lib/type";
import { $Enums, AddOns, Product, ProductCategory, Size } from "@prisma/client";
import { tree } from "next/dist/build/templates/app-page";

export const addToCart = async (data: TaddCartToDB[]) => {
  const user = await currentUser();

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
    const result = await Promise.all(
      data.map(async (product: TaddCartToDB) => {
        const existingCartItem = await db.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: product.product.id,
            sizeOption: product.sizeOption,
            sideOption: product.sideOption,
          },
        });

        if (existingCartItem) {
          await db.cartItem.update({
            where: {
              id: existingCartItem.id,
            },
            data: {
              quantity: existingCartItem.quantity + 1,
            },
          });
          return { success: true };
        } else {
          const newItem = await db.cartItem.create({
            data: {
              cartId: cart.id,
              productId: product?.product.id,
              quantity: product?.quantity,
              sizeOption: product.sizeOption || "standard",
              sideOption: product.sideOption || "noAddOns",
              extraPrice: product.extraPrice,
              itemTotal:
                (product?.product.price! + product?.extraPrice!) *
                product.quantity!,
            },
          });
          return { success: true, item: newItem };
        }
      }),
    );
    const productAdded = result.every((result) => result.success);
    if (productAdded) {
      return { success: "Item added to cart successfully" };
    } else {
      return { success: "Item Already in Cart" };
    }
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong!" };
  }
};

export const addCartItems = async (
  data: {
    productId: string;
    quantity?: number;
    sizeOption?: Size;
    sideOption?: AddOns;
    extraPrice?: number;
    itemTotal?: number;
  }[],
) => {
  const user = await currentUser();

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
  } else {
    await db.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
  }
  try {
    const products = await db.product.findMany({
      where: {
        id: {
          in: data.map((item) => item.productId),
        },
      },
    });

    if (products.length !== data.length) {
      return { status: 404, message: "Product not found" };
    }

    const result = await Promise.all(
      data.map(async (item) => {
        const userProduct = products.find(
          (product) => product.id === item.productId,
        );

        if (!userProduct) {
          return {
            status: 404,
            message: `Product with ID ${item.productId} not found`,
          };
        }

        if (typeof item.quantity !== "number" || item.quantity <= 0) {
          return { status: 500, message: "Invalid quantity" };
        }
        const quantity = item.quantity || 1;
        const sizeOption = item.sizeOption || "standard";
        const sideOption = item.sideOption || "noAddOns";
        const extraPrice =
          ADDONSPRICE.addOns[
            item.sideOption as keyof typeof ADDONSPRICE.addOns
          ] ||
          0 +
            ADDONSPRICE.size[
              item.sizeOption as keyof typeof ADDONSPRICE.size
            ] ||
          0;

        const newItem = await db.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId,
            quantity,
            sizeOption,
            sideOption,
            extraPrice,
            itemTotal: userProduct?.price! + extraPrice * item.quantity! || 1,
          },
        });
        return {
          status: 200,
          cartItemId: newItem.id,
          message: "Item added to cart",
        };
      }),
    );
    return cart.id;
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong!" };
  }
};
