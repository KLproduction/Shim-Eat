"use server";

import { db } from "@/lib/db";

export const getProductById = async (id: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  } catch {
    return null;
  }
};
