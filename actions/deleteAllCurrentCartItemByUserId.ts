"use server";

import { db } from "@/lib/db";

export const deleteAllCurrentCartItemByUserId = async (userId: string) => {
  try {
    const cart = await db.cart.findFirst({
      where: {
        userId,
      },
    });

    await db.cartItem.deleteMany({
      where: {
        cartId: cart?.id,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
