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
      return { success: true, message: "Product added successfully." };
    } catch {
      return {
        success: false,
        message: "Something went wrong. product name cannot be duplicate",
      };
    }
  }
};
