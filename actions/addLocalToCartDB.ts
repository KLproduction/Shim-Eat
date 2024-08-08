"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProductCategory, AddOns, Size } from "@prisma/client";

type TfetchedProduct = {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string | null;
  category?: ProductCategory;
  quantity?: number;
  sizeOption?: Size;
  sideOption?: AddOns;
  extraPrice?: number;
};

const addLocalToCart = async (data: TfetchedProduct[]) => {
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
    const results = await Promise.all(
      data.map(async (product) => {
        if (!product.id) {
          return { success: false, message: "Missing product ID" };
        }
        const existingCartItem = await db.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: product.id,
            sizeOption: product.sizeOption,
            sideOption: product.sideOption,
          },
        });

        if (existingCartItem) {
          return { success: false, message: "Item already in cart." };
        } else {
          const newItem = await db.cartItem.create({
            data: {
              cartId: cart.id,
              productId: product.id,
              quantity: product.quantity,
              sizeOption: product.sizeOption! ?? "STANDARD",
              sideOption: product.sideOption! ?? "NO_ADDONS",
              extraPrice: product.extraPrice ?? 0,
              itemTotal:
                ((product.price ?? 0) + (product.extraPrice ?? 0)) *
                (product.quantity ?? 1),
            },
          });
          return { success: true, item: newItem };
        }
      }),
    );

    const allAdded = results.every((result) => result.success);
    if (allAdded) {
      return { success: "All items added to cart successfully!" };
    } else {
      const failedMessages = results
        .filter((result) => !result.success)
        .map((result) => result.message);
      return { success: "Some items were not added.", details: failedMessages };
    }
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong!" };
  }
};

export default addLocalToCart;
