"use server";

import { db } from "@/lib/db";
import { TAddProduct } from "@/lib/type";
import { $Enums, Product } from "@prisma/client";
import { error } from "console";
import { string, number } from "zod";

export const addProductToDB = async (values: TAddProduct) => {
  if (values) {
    try {
      await db.product.create({
        data: {
          name: values.name,
          description: values.description,
          price: values.price,
          image: values.image,
          category: values.category,
        },
      });
    } catch {
      return { error: "Something went wrong" };
    }
  }
  return { success: "Product added." };
};
