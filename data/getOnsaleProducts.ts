"use server";

import { db } from "@/lib/db";

export const getOnSaleProducts = async () => {
  try {
    const products = await db.product.findMany({
      where: {
        status: "onSale",
      },
      orderBy: {
        category: "desc",
      },
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};
