"use server";

import { db } from "@/lib/db";

export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      orderBy: { category: "desc" },
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};
