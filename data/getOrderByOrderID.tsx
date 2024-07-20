"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getOrderByOrderID = async (orderId: string) => {
  const user = await currentUser();
  if (!user) return;

  const products = await db.userOrder.findUnique({
    where: {
      id: orderId,
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
