"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

export const getuserOrderFromDB = async (userId: string) => {
  const products = await db.userOrder.findMany({
    where: {
      userId: userId,
    },
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
