"use client";

import { ExtenderUser } from "@/next-auth";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { ADDONSPRICE } from "@/data/products";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { RootState, store } from "@/redux/store";
import { Card } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "@/redux/slices/add-to-cart-slice";
import { Trash } from "lucide-react";

export type Props = {
  userProduct: {
    productId: string;
    quantity: number;
    sizeOption: string;
    sideOption: string;
    extraPrice: number;
    itemTotal: number;
    image: string;
    price: number;
    name: string;
    category: string;
  }[];
};

const ShowUserCartFromStorageSide = ({ userProduct }: Props) => {
  const dispatch = useDispatch();

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-5 rounded-md",
        // userProduct.length > 2
        //   ? "h-[30%] sm:h-[40%]"
        //   : "h-[60%] min-h-[500px] sm:h-[70%]",
      )}
    >
      <>
        <div className="flex h-auto w-full items-center justify-start">
          <div className="mx-auto p-3">
            {userProduct.length > 0 ? (
              <>
                <div>
                  {userProduct?.map((item) => (
                    <div
                      className="w-full p-3"
                      key={`${item?.productId}-${item?.sizeOption}-${item?.sideOption}`}
                    >
                      <div className="relative flex min-w-[] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-3 shadow">
                        <img
                          src={item?.image || undefined}
                          className="h-auto max-w-[60px] items-center rounded-full object-cover"
                        />
                        <div className="flex flex-col items-center gap-2">
                          <h1 className="text-md font-bold">{item?.name}</h1>
                          {item.category !== "drinks" && (
                            <div className="text-sm">
                              <h2>
                                Size: {item?.sizeOption?.toUpperCase()} + (
                                {formatPrice(
                                  ADDONSPRICE.size[
                                    item?.sizeOption as keyof typeof ADDONSPRICE.size
                                  ],
                                )}
                                )/item
                              </h2>
                              <h2>
                                Side: {item?.sideOption?.toUpperCase()} + (
                                {formatPrice(
                                  ADDONSPRICE.addOns[
                                    item?.sideOption as keyof typeof ADDONSPRICE.addOns
                                  ],
                                )}
                                )/item
                              </h2>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-center">
                          <input
                            className="w-16 rounded-lg border border-zinc-400 text-center"
                            type="number"
                            value={item?.quantity!}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              dispatch(
                                updateProductQuantity({
                                  productId: item?.productId,
                                  quantity: newQuantity,
                                  sizeOption: item?.sizeOption,
                                  sideOption: item?.sideOption,
                                }),
                              );
                            }}
                            min={1}
                          />
                          <h1 className="mt-2 text-lg">
                            Total:{" "}
                            {formatPrice(
                              item?.quantity! *
                                (item?.price! + item?.extraPrice!),
                            )}
                          </h1>
                        </div>
                        <div className="absolute right-0 top-0">
                          <Button
                            size={"sm"}
                            variant={"ghost"}
                            onClick={() => {
                              dispatch(
                                removeProductFromCart({
                                  productId: item?.productId,
                                  sideOption: item?.sideOption,
                                  sizeOption: item?.sizeOption,
                                }),
                              );
                            }}
                            className="m-2 rounded-full text-red-500"
                          >
                            <Trash size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex h-full w-full translate-y-1/2 flex-col justify-center gap-5">
                <h1 className="text-2xl">Your shopping cart is empty</h1>
                <Button className="mx-auto">
                  <Link href={"/menu"}>Continue Shopping</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default ShowUserCartFromStorageSide;
