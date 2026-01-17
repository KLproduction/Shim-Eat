"use server";

import { getProductById } from "@/data/getProductById";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProductsettingSchema } from "@/schemas";
import * as z from "zod";

export const productSetting = async (
  productId: string,
  values: z.infer<typeof ProductsettingSchema>,
) => {
  const product = await getProductById(productId);
  const user = await currentUser();

  try {
    if (user?.role !== "ADMIN") {
      return { error: "Unauthorized" };
    }

    if (!product) {
      return { error: "No product found!" };
    }

    await db.product.update({
      where: { id: productId },
      data: {
        ...values,
      },
    });

    return { success: "Product details updated" };
  } catch (e) {
    console.error(e);
  }
};
