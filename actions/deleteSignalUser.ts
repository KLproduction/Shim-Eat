"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface deleteSignalUserProps {
  userId: string;
}

export const deleteSignalUser = async ({ userId }: deleteSignalUserProps) => {
  const operatingUser = await currentUser();

  if (!operatingUser) {
    return { error: "Authentication required." };
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { error: "User not found." };
  }

  if (user.id === operatingUser.id) {
    return { error: "Cannot delete operating account." };
  }

  const orders = await db.userOrder.findMany({
    where: { userId: user.id },
  });

  for (const order of orders) {
    await db.orderItem.deleteMany({
      where: { orderId: order.id },
    });
    await db.userOrder.delete({
      where: { id: order.id },
    });
  }

  const carts = await db.cart.findMany({
    where: { userId: user.id },
  });

  for (const cart of carts) {
    await db.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
    await db.cart.delete({
      where: { id: cart.id },
    });
  }

  await db.user.delete({
    where: { id: user.id },
  });

  return { success: "User data deleted successfully." };
};
