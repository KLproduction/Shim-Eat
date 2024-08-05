"use server";

import { db } from "@/lib/db";

export const getProductByName = async (name: string) => {
  try {
    const products = await db.product.findMany();
    const product = products.filter((item) => item.name === name);
    return product;
  } catch {
    return null;
  }
};
