"use server";
import * as z from "zod";
import { getOrderByOrderID } from "@/data/getOrderByOrderID";
import { db } from "@/lib/db";
import { ChangeOrderStatusSchema } from "@/schemas";

export const changeOrderStatus = async (
  values: z.infer<typeof ChangeOrderStatusSchema>
) => {
  try {
    await db.userOrder.update({
      where: {
        id: values.orderId,
      },
      data: {
        status: values.status,
      },
    });
    return { success: "Order State changed." };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong!" };
  }
};
