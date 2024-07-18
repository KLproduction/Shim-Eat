"use server";

import { getProductById } from "@/data/getProductById";
import { db } from "@/lib/db";
import { ProductsettingSchema } from "@/schemas";
import * as z from "zod";

export const productSetting = async (
  productId: string,
  values: z.infer<typeof ProductsettingSchema>
) => {
  const product = await getProductById(productId);
  try {
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

// if(product){
//     values.name = product.name
//     values.category = product.category
//     values.description = product.description
//     values.price = product.price
//     values.image = product?.image||undefined
// }
