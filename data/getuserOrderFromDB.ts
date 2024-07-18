"use server";

import { db } from "@/lib/db";

export const getuserOrderFromDB = async (userId: string) => {
  const products = await db.userOrder.findMany({
    where: {
      userId: userId,
      status: "PAID" || "DELIVERING" || "COMPLETE",
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
