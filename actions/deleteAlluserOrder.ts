"use server";

import { getProductById } from "@/data/getProductById";
import { db } from "@/lib/db";

export const deleteAlluserOrder = async () => {
  try {
    await db.orderItem.deleteMany();
    await db.userOrder.deleteMany();
    return { message: "All user order deleted" };
  } catch {
    return { message: "order not found." };
  }
};
