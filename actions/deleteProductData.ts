"use server";

import { getProductById } from "@/data/getProductById";
import { db } from "@/lib/db";

export const deleteProductData = async (productId: string) => {
  const product = getProductById(productId);
  try {
    if (productId) {
      await db.product.delete({
        where: { id: productId },
      });
    }
    return { success: "Product data deleted" };
  } catch {
    return { error: "Product not found." };
  }
};
