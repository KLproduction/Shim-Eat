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
import AddCartitemToOrderBtn from "./AddCartitemToOrderBtn";

export type UserT = {
  user: ExtenderUser;
};

const ShowUserCartFromDB = ({ user }: UserT) => {
  const [pending, startTransition] = useTransition();
  const [updateCount, setUpdateCount] = useState<number>(0);
  const [userProduct, setUserProduct] = useState<userCart>();
  const [total, setTotal] = useState(0);

  function isValidUserCart(data: any): data is userCart {
    return data;
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getCartItembyId(user?.id!);
      if (isValidUserCart(data)) {
        setUserProduct(data);
      }
    };
    getData();
  }, [updateCount]);

  useEffect(() => {
    if (userProduct?.items.length) {
      const orderTotal = userProduct.items.reduce(
        (acc, item) => acc + (item.itemTotal || 0),
        0,
      );
      setTotal(orderTotal);
    }
  }, [userProduct]);

  const handleQuantityChange = (
    cartId: string,
    productId: string,
    sizeOption: Size,
    sideOption: AddOns,
    newQuantity: number,
  ) => {
    startTransition(async () => {
      await cartQuantityUpdate(
        cartId,
        productId,
        sizeOption,
        sideOption,
        newQuantity,
      )
        .then((result) => {
          if (result.error) {
            toast.error(result.error);
          }
        })
        .then(() => {
          setUpdateCount((c) => c + 1);
        });
    });
  };

  const deleteCartAction = (
    cartId: string,
    productId: string,
    sizeOption: Size,
    sideOption: AddOns,
  ) => {
    startTransition(async () => {
      console.log(cartId, productId, sizeOption, sideOption);
      if (cartId) {
        const result = await deleteCart(
          cartId,
          productId,
          sizeOption,
          sideOption,
        );
        result.success
          ? toast.success(result.success)
          : toast.error(result.error);
        setUpdateCount((count) => count + 1);
      } else {
        console.log("No CartId");
      }
    });
  };

  if (!user || userProduct?.items.length === 0)
    return (
      <Card className="flex min-h-screen flex-col justify-center">
        <div className="flex h-full flex-col items-center justify-center gap-5">
          <h1>Your shopping cart is empty</h1>
          <Button>
            <Link href={"/menu"}>Continue Shopping</Link>
          </Button>
        </div>
      </Card>
    );

  return (
    <div className="flex h-auto w-full items-center justify-start">
      <div className="mx-auto p-3">
        {user.id ? (
          <>
            <div>
              {userProduct?.items.map((item) => (
                <div className="p-3" key={`${item.id}-${item.productId}`}>
                  <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-white p-4 shadow sm:grid sm:grid-cols-5">
                    <img
                      src={item?.product?.image || undefined}
                      className="col-span-1 h-auto max-w-[100px] items-center rounded-full object-cover sm:items-start"
                    />
                    <div className="flex flex-col items-center gap-2 sm:col-span-2 sm:items-start">
                      <h1 className="text-lg font-bold sm:col-span-2">
                        {item?.product.name}
                      </h1>
                      <div className="text-sm">
                        <h2>
                          Size: {item?.sizeOption?.toUpperCase()} + (
                          {formatPrice(
                            ADDONSPRICE.size[
                              item?.sizeOption as keyof typeof ADDONSPRICE.size
                            ],
                          )}
                          )
                        </h2>
                        <h2>
                          Side: {item?.sideOption?.toUpperCase()} + (
                          {formatPrice(
                            ADDONSPRICE.addOns[
                              item?.sideOption as keyof typeof ADDONSPRICE.addOns
                            ],
                          )}
                          )
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        <Button
                          variant={"ghost"}
                          className="px-2 text-2xl"
                          onClick={() =>
                            handleQuantityChange(
                              item.cartId,
                              item.product.id,
                              item.sizeOption,
                              item.sideOption,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                        >
                          -
                        </Button>
                        <input
                          className="mx-2 w-16 rounded-lg border border-zinc-400 text-center"
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.cartId,
                              item.product.id,
                              item.sizeOption,
                              item.sideOption,
                              parseInt(e.target.value, 10),
                            )
                          }
                          min="1"
                        />
                        <Button
                          variant={"ghost"}
                          className="text-md px-2"
                          onClick={() =>
                            handleQuantityChange(
                              item.cartId,
                              item.product.id,
                              item.sizeOption,
                              item.sideOption,
                              item.quantity + 1,
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                      <h1 className="mt-2 text-lg">
                        Total:{" "}
                        {formatPrice(
                          item?.quantity! *
                            (item?.product.price! + item?.extraPrice!),
                        )}
                      </h1>
                    </div>
                    <div className="sm:col-span-1 sm:ml-auto sm:justify-center">
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() =>
                          deleteCartAction(
                            item.cartId,
                            item?.product.id,
                            item?.sizeOption!,
                            item?.sideOption!,
                          )
                        }
                        disabled={pending}
                        className="m-2 rounded bg-red-500 p-2 text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-3">
                <h1>Total:{formatPrice(total)}</h1>
                {total > 0 && <AddCartitemToOrderBtn orderPrice={total || 0} />}
              </div>
            </div>
          </>
        ) : (
          <div>
            <h1>Your shopping cart is empty</h1>
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
