"use server";

import { products } from "@/data/products";
import { db } from "@/lib/db";

export async function createAllProducts() {
  const data = products;
  try {
    for (const product of data) {
      const existingProduct = await db.product.findFirst({
        where: {
          name: product.name,
        },
      });

      if (!existingProduct) {
        await db.product.createMany({
          data: products,
          skipDuplicates: true, // This prevents errors in case some products already exist
        });
        return { message: "Products successfully created." };
      }
    }
  } catch (error) {
    console.error(error);
    return { message: "Error creating products:" };
  }
}
