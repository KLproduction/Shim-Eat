"use server";

import { db } from "@/lib/db";

export const getCartItembyStorage = async (productId: string) => {
  const product = await db.product.findFirst({
    where: { id: productId },
  });

  return product;
};
