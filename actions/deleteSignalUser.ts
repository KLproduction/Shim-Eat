"use server";

import { db } from "@/lib/db";

interface deleteSignalUserProps {
  userId: string;
}

export const deleteSignalUser = async ({ userId }: deleteSignalUserProps) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { error: "Something went wrong." };
  }
  if (user) {
    const carts = await db.cart.findMany({
      where: { userId: user.id },
    });

    carts.map(async (cart) => {
      await db.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    });

    await db.cart.deleteMany({
      where: { userId: userId },
    });

    await db.user.delete({
      where: { id: userId },
    });
  }

  return { success: "User Data Deleted" };
};
