"use server";
import * as z from "zod";
import { getOrderByOrderID } from "@/data/getOrderByOrderID";
import { db } from "@/lib/db";
import { ChangeDeliveryStatusSchema } from "@/schemas";
import { DeliveryStatus, OrderStatus } from "@prisma/client";

export const changeDeliveryStatus = async (
  values: z.infer<typeof ChangeDeliveryStatusSchema>
) => {
  try {
    await db.userOrder.update({
      where: {
        id: values.orderId,
      },
      data: {
        deliveryStatus: values.deliveryStatus,
      },
    });
    return { success: "Delivery Status Changed." };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong!" };
  }
};
