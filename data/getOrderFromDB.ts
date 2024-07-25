"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getOrderFromDB = async () => {
  const user = await currentUser();
  if (!user) return;

  const products = await db.userOrder.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return products;
};
