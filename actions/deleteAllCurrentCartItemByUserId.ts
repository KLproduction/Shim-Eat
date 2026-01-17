"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const deleteAllCurrentCartItemByUserId = async (userId: string) => {
  const user = await currentUser();

  try {
    if (user?.isSuperAdmin === false) {
      return { error: "Unauthorized" };
    }
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
