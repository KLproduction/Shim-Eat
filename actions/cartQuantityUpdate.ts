"use server";

import { getProductById } from "@/data/getProductById";
import { db } from "@/lib/db";
import { userCart } from "@/lib/type";
import { Size, AddOns, Product } from "@prisma/client";

export const cartQuantityUpdate = async (
  cartId: string,
  productId: string,
  sizeOption: Size,
  sideOption: AddOns,
  newQuantity: number
) => {
  const exisitingItem = await db.cartItem.findUnique({
    where: {
      cartId_productId_sizeOption_sideOption: {
        cartId,
        productId,
        sizeOption,
        sideOption,
      },
    },
  });

  if (exisitingItem) {
    const product = (await getProductById(productId)) as Product;

    try {
      await db.cartItem.update({
        where: {
          cartId_productId_sizeOption_sideOption: {
            cartId,
            productId,
            sizeOption,
            sideOption,
          },
        },
        data: {
          quantity: newQuantity,
          itemTotal: newQuantity * (product.price + exisitingItem.extraPrice),
        },
      });
      return { success: "Quantity updated successfully." };
    } catch (e) {
      console.error(e);
    }
  }
  return { error: "Item Not Found." };
};
