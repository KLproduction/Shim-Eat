"use server";

import { db } from "@/lib/db";

export const deleteOrderByOrderId = async (orderId: string) => {
  try {
    if (orderId) {
      await db.userOrder.delete({
        where: { id: orderId },
      });

      console.log("Pending order deleted.");
    }
  } catch (e) {
    console.error(e);
  }
};
