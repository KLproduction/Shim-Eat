"use server";

import { getCartIdbyUserId } from "@/data/getCartIdbyUserId";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { userCart } from "@/lib/type";

export const addCartToOrder = async (data: userCart[]) => {
  const user = await currentUser();
  if (!user?.id) return null;

  const orderPrice = data.reduce((totalPrice, cartItem) => {
    return cartItem.items.reduce((total, item) => {
      const subtotal = total + item.itemTotal;
      return totalPrice + subtotal;
    }, 0);
  }, 0);
  const orderPriceToTwo = orderPrice.toFixed(2);
  const formattedPrice = parseFloat(orderPriceToTwo);
  try {
    const order = await db.userOrder.create({
      data: {
        userId: user.id,
        orderPrice: formattedPrice,
      },
    });
    const cartId = await getCartIdbyUserId(user.id);
    const cartItems = await db.cartItem.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    });

    const orderItemsData = cartItems.map((cartItem) => ({
      orderId: order.id,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      sizeOption: cartItem.sizeOption,
      sideOption: cartItem.sideOption,
      extraPrice: cartItem.extraPrice,
      price: cartItem.product.price,
    }));

    if (!orderItemsData) {
      return { error: "No Cart Items Found!" };
    }

    await db.$transaction([
      db.orderItem.createMany({
        data: orderItemsData,
      }),
    ]);
    return {
      success: "data updated",
      orderId: order.id,
    };
  } catch (e) {
    console.error(e);
    return { error: "something went wrong" };
  }
};
