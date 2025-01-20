"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import AddCartitemToOrderBtn from "./AddCartitemToOrderBtn";
import MySpinner from "./ui/MySpinner";
import { cn } from "@/lib/utils";
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

  console.log(userProduct);

  return (
    <MaxWidthWrapper>
      {isFetching && <MySpinner />}
      <div className="flex h-auto w-full flex-col items-center justify-start pb-12">
        <div className="mx-auto p-3">
          <div></div>
          {hasItems ? (
            userProduct?.map((item) => (
              <div
                key={item.id}
                className="flex w-full flex-col items-center justify-center gap-4"
              >
                <CartItemCard data={item} cartId={cartId} />
                <div className="flex w-full justify-end pr-6">
                  Total: {orderTotal}
                </div>
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
        </div>
        {hasItems && <AddCartitemToOrderBtn orderPrice={total} />}
      </div>
    </MaxWidthWrapper>
  );
};

export default ShowUserCartFormDB;
