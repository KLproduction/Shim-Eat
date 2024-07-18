"use client";

import { currentUser } from "@/lib/auth";
import { AddOns, Size } from "@prisma/client";

export type StorageCartItem = {
  userId: string;
  productId: string;
  quantity: Size;
  sizeOption: "large" | "standard";
  sideOption: AddOns;
  addOnsPrice: number;
};

const addToCartbyStorage = async (
  productId: string,
  sizeOption: Size,
  sideOption: AddOns,
  extraPrice: number,
  quantity: number = 1
) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Please login to purchase." };
  }
  const userId = user.id;
  const storageKey = "local-cart";
  const storedCart = localStorage.getItem(storageKey);
  const cartItems = storedCart ? JSON.parse(storedCart) : [];
  const existingProductIndex = cartItems.findIndex(
    (item: StorageCartItem) =>
      item.productId === productId &&
      item.userId === user.id &&
      item.sizeOption === sizeOption &&
      item.sideOption === sideOption
  );

  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity += quantity;
    cartItems[existingProductIndex].addOnsPrice = extraPrice;
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
    return { success: "Quantity updated" };
  } else {
    cartItems.push({
      userId,
      productId,
      quantity,
      sizeOption,
      sideOption,
      extraPrice,
    });
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
    return { success: "Item added" };
  }
};
export default addToCartbyStorage;
