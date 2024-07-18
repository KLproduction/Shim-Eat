"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getUserOrder = async () => {
  const user = await currentUser();
  if (!user) return;

  const products = await db.userOrder.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return products;
};
