"use server";

import { db } from "@/lib/db";

export const deleteAllProduct = async () => {
  try {
    await db.product.deleteMany();
    return { message: "Products successfully deleted." };
  } catch (error) {
    console.error(error);
    return { message: "Something wrong" };
  }
};
