"use server";

import { db } from "@/lib/db";
import { AddOns, Size } from "@prisma/client";
import { stat } from "fs";

export const getProductImage = async () => {
  const images = await db.product.findMany({
    select: {
      id: true,
      image: true,
    },
  });

  if (images) {
    return {
      images,
      status: 200,
    };
  }
  return {
    status: 500,
  };
};

export const getCartItemByCartId = async (cartId: string) => {
  try {
    const cartItems = await db.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (cartItems) {
      const items = cartItems.items;
      return {
        items,
        status: 200,
      };
    }
    return {
      status: 404,
      message: "No items found",
    };
  } catch (e) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

export const onChangeCartItemQuantity = async (
  cartId: string,
  productId: string,
  sizeOption: Size,
  sideOption: AddOns,
  quantity: number,
) => {
  try {
    const updatedItem = await db.cartItem.update({
      where: {
        cartId_productId_sizeOption_sideOption: {
          cartId,
          productId,
          sizeOption,
          sideOption,
        },
      },
      data: {
        quantity,
      },
    });

    if (updatedItem) {
      return {
        status: 200,
        message: "Item updated",
      };
    }

    return {
      status: 404,
      message: "Item not found",
    };
  } catch (e) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

export const onDeleteCartItem = async (
  cartId: string,
  productId: string,
  sizeOption: Size,
  sideOption: AddOns,
) => {
  try {
    const existingCartItem = await db.cartItem.findUnique({
      where: {
        cartId_productId_sizeOption_sideOption: {
          cartId,
          productId,
          sizeOption,
          sideOption,
        },
      },
    });
    if (existingCartItem) {
      await db.cartItem.delete({
        where: {
          cartId_productId_sizeOption_sideOption: {
            cartId,
            productId,
            sizeOption,
            sideOption,
          },
        },
      });
      return {
        status: 200,
        message: "Item deleted",
      };
    }
    return {
      status: 404,
      message: "Item not found",
    };
  } catch (e) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
