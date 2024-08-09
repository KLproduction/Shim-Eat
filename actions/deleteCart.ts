"use server";

import { db } from "@/lib/db";
import { AddOns, Size } from "@prisma/client";

export const deleteCart = async (
  cartId: string,
  productId: string,
  sizeOption: Size,
  sideOption: AddOns,
) => {
  const exisitingItem = await db.cartItem.findUnique({
    where: {
      cartId_productId_sizeOption_sideOption: {
        cartId: cartId,
        productId: productId,
        sizeOption: sizeOption,
        sideOption: sideOption,
      },
    },
  });

  if (exisitingItem) {
    try {
      await db.cartItem.delete({
        where: {
          cartId_productId_sizeOption_sideOption: {
            cartId: cartId,
            productId: productId,
            sizeOption: sizeOption,
            sideOption: sideOption,
          },
        },
      });
      return { success: "Item Deleted" };
    } catch (e) {
      console.error(e);
    }
  }
  return { error: "Item Not Found." };
};
