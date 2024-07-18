"use server";

import { db } from "@/lib/db";

export const getCartIdbyUserId = async (userId: string) => {
  const cart = await db.cart.findUnique({
    where: { id: userId },
  });
  return cart?.id;
};
