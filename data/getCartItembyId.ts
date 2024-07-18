"use server";

import { db } from "@/lib/db";

export const getCartItembyId = async (userId: string) => {
  try {
    const cart = await db.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            addedOn: "asc",
          },
        },
      },
    });

    return cart;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
  }
};
