"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TaddCartToDB } from "@/lib/type";
import { $Enums, AddOns, Product, ProductCategory, Size } from "@prisma/client";

const addToCart = async (data: TaddCartToDB[]) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Please login to shop!" };
  }

  let cart = await db.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) {
    cart = await db.cart.create({
      data: {
        userId: user.id!,
      },
    });
  }
  try {
    const result = await Promise.all(
      data.map(async (product: TaddCartToDB) => {
        const existingCartItem = await db.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: product.product.id,
            sizeOption: product.sizeOption,
            sideOption: product.sideOption,
          },
        });

        if (existingCartItem) {
          return { success: false };
        } else {
          const newItem = await db.cartItem.create({
            data: {
              cartId: cart.id,
              productId: product?.product.id,
              quantity: product?.quantity,
              sizeOption: product.sizeOption || "standard",
              sideOption: product.sideOption || "noAddOns",
              extraPrice: product.extraPrice,
              itemTotal:
                (product?.product.price! + product?.extraPrice!) *
                product.quantity!,
            },
          });
          return { success: true, item: newItem };
        }
      })
    );
    const productAdded = result.every((result) => result.success);
    if (productAdded) {
      return { success: "Item added to cart successfully" };
    } else {
      return { success: "Item Already in Cart" };
    }
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong!" };
  }
};

export default addToCart;

// const updatedItem = await db.cartItem.update({
//   where: {
//     id: existingCartItem.id,
//   },
//   data: {
//     quantity: existingCartItem.quantity! + 1,
//   },
// });

// return {
//   error: "Item Already in Cart.",
// };
