"use client";
import { getCartItembyId } from "@/data/getCartItembyId";
import { ExtenderUser } from "@/next-auth";
import { $Enums, AddOns, ProductCategory, Size } from "@prisma/client";
import { startTransition, useEffect, useState, useTransition } from "react";
import { Card } from "./ui/card";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { deleteCart } from "@/actions/deleteCart";
import { getProductById } from "@/data/getProductById";
import addToCart from "@/actions/addToCartDB";
import { toast } from "sonner";
import { getCartIdbyUserId } from "@/data/getCartIdbyUserId";
import { formatPrice } from "@/lib/formatPrice";
import { ADDONSPRICE } from "@/data/products";
import Link from "next/link";
import { userCart } from "@/lib/type";
import addToCartDB from "@/actions/addToCartDB";
import { cartQuantityUpdate } from "@/actions/cartQuantityUpdate";

export type UserT = {
  user: ExtenderUser;
};

const ShowUserCartFromDB = ({ user }: UserT) => {
  const [pending, startTransition] = useTransition();
  const [updateCount, setUpdateCount] = useState(0);
  const [userProduct, setUserProduct] = useState<userCart>();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  function isValidUserCart(data: any): data is userCart {
    return data;
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getCartItembyId(user?.id!);
      if (isValidUserCart(data)) {
        setUserProduct(data);
        const orderTotal = data.items.reduce(
          (acc, item) => acc + (Number(item.itemTotal) || 0),
          0
        );
        setTotal(orderTotal);
      }
    };
    getData();
  }, [updateCount]);

  const handleQuantityChange = (
    cartId: string,
    productId: string,
    sizeOption: Size,
    sideOption: AddOns,
    newQuantity: number
  ) => {
    startTransition(async () => {
      await cartQuantityUpdate(
        cartId,
        productId,
        sizeOption,
        sideOption,
        newQuantity
      );
    });
    setUpdateCount((c) => c + 1);
  };

  const deleteCartAction = (
    cartId: string,
    productId: string,
    sizeOption: Size,
    sideOption: AddOns
  ) => {
    startTransition(async () => {
      if (cartId) {
        setLoading(!loading);
        const result = await deleteCart(
          cartId,
          productId,
          sizeOption,
          sideOption
        );

        setUpdateCount((count) => count + 1);
      } else {
        console.log("No CartId");
      }
      setLoading(!loading);
    });
  };

  return (
    <div className="flex justify-start items-center w-full h-auto">
      <div className="mx-auto p-3">
        {user.id && userProduct?.items.length! > 0 ? (
          <>
            <div>
              {userProduct?.items.map((item, index) => (
                <div
                  className="p-3 "
                  key={`${item?.id}-${item.cartId}-${item?.sizeOption}-${item?.sideOption}`}
                >
                  <div className="flex flex-col justify-center gap-4 items-center bg-white rounded-md shadow p-3">
                    <img
                      src={item?.product?.image || undefined}
                      className="max-w-[60px] h-auto object-cover rounded-full items-center"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <h1 className="text-md font-bold ">
                        {item?.product.name}
                      </h1>
                      <div className="text-sm">
                        <h2>
                          Size: {item?.sizeOption?.toUpperCase()} + (
                          {formatPrice(
                            ADDONSPRICE.size[
                              item?.sizeOption as keyof typeof ADDONSPRICE.size
                            ]
                          )}
                          )
                        </h2>
                        <h2>
                          Side: {item?.sideOption?.toUpperCase()} + (
                          {formatPrice(
                            ADDONSPRICE.addOns[
                              item?.sideOption as keyof typeof ADDONSPRICE.addOns
                            ]
                          )}
                          )
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <input
                        className="w-16 border border-zinc-400 rounded-lg text-center"
                        type="number"
                        value={item?.quantity!}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.cartId,
                            item?.product.id!,
                            item?.sizeOption!,
                            item?.sideOption!,
                            parseInt(e.target.value)
                          )
                        }
                        min={1}
                      />
                      <h1 className="mt-2 text-lg">
                        Total:{" "}
                        {formatPrice(
                          item?.quantity! *
                            (item?.product.price! + item?.extraPrice!)
                        )}
                      </h1>
                    </div>
                    <div className="sm:col-span-1 sm:justify-center sm:ml-auto">
                      <Button
                        size={"sm"}
                        onClick={() =>
                          deleteCartAction(
                            item.cartId,
                            item?.product.id,
                            item?.sizeOption!,
                            item?.sideOption!
                          )
                        }
                        className="m-2 bg-red-500 text-white p-2 rounded"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" sticky inset-x-0 bottom-0 bg-white h-30 p-3 w-full border-orange-100 border rounded-lg">
              <h1>Total: {formatPrice(total)}</h1>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5 mt-[70%] ">
            <h1 className="text-sm">Your shopping cart is empty</h1>
            <Button>
              <Link href={"/menu"}>Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowUserCartFromDB;
