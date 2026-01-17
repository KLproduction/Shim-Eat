"use server";

import { getProductById } from "@/data/getProductById";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const deleteProductData = async (productId: string) => {
  const user = await currentUser();
  if (!user || user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

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
