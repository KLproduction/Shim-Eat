"use client";
import { getCartItembyId } from "@/data/getCartItembyId";
import { ExtenderUser } from "@/next-auth";
import { $Enums, AddOns, ProductCategory, Size } from "@prisma/client";
import { startTransition, useEffect, useState, useTransition } from "react";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { deleteCart } from "@/actions/deleteCart";
import { getProductById } from "@/data/getProductById";

import { toast } from "sonner";
import { getCartIdbyUserId } from "@/data/getCartIdbyUserId";
import { formatPrice } from "@/lib/formatPrice";
import { ADDONSPRICE } from "@/data/products";
import Link from "next/link";
import { userCart } from "@/lib/type";
import { cartQuantityUpdate } from "@/actions/cartQuantityUpdate";
import AddCartitemToOrderBtn from "./AddCartitemToOrderBtn";
import MySpinner from "./ui/MySpinner";
import { usePathname, useSearchParams } from "next/navigation";
import { deleteAllCurrentCartItemByUserId } from "@/actions/deleteAllCurrentCartItemByUserId";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCartMain } from "@/hooks/cart";
import CartItemCard from "./CartItemCard";

type Props = {
  cartId: string;
};

const ShowUserCartFormDB = ({ cartId }: Props) => {
  const { cartItems, isFetching } = useCartMain(cartId);
  const userProduct = cartItems?.items;
  const hasItems = userProduct && userProduct.length > 0;
  const total = userProduct?.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);
  const orderTotal = formatPrice(total || 0);

  return (
    <MaxWidthWrapper>
      {isFetching && <MySpinner />}
      <div className="flex h-auto w-full flex-col items-center justify-start pb-12">
        <div className="mx-auto p-3">
          {hasItems ? (
            userProduct?.map((item) => (
              <div>
                <CartItemCard data={item} cartId={cartId} />
              </div>
            ))
          ) : (
            <div
              className={cn(
                "flex h-auto w-full translate-y-2/3 flex-col items-center justify-center gap-5",
                isFetching ? "hidden" : "",
              )}
            >
              <h1 className="text-3xl text-zinc-600">
                Your shopping cart is empty
              </h1>
              <Button>
                <Link href={"/menu"}>Continue Shopping</Link>
              </Button>
            </div>
          )}
          <div className="flex w-full justify-end pr-6">
            Total: {orderTotal}
          </div>
        </div>
        <AddCartitemToOrderBtn orderPrice={total} />
      </div>
    </MaxWidthWrapper>
  );
};

export default ShowUserCartFormDB;
