"use server";

import { db } from "@/lib/db";

export const deleteSigalUserOrder = async (orderId: string) => {
  try {
    await db.orderItem.deleteMany({
      where: { orderId: orderId },
    });
    await db.userOrder.delete({
      where: { id: orderId },
    });
    return { message: "User order deleted" };
  } catch {
    return { message: "Order not found." };
  }
};
