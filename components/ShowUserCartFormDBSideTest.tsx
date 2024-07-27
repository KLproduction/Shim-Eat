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
import { CartItemWithProduct, userCart } from "@/lib/type";
import addToCartDB from "@/actions/addToCartDB";
import { cartQuantityUpdate } from "@/actions/cartQuantityUpdate";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentUser } from "@/hooks/use-current-user";
import ShowUserCartFromDBSide from "./ShowUserCartFormDBSide";
import { redirect, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { currentUser } from "@/lib/auth";

import { cn } from "@/lib/utils";

export type UserT = {
  user: ExtenderUser;
};

const ShowUserCartFromDBSideTest = () => {
  const [pending, startTransition] = useTransition();
  const [updateCount, setUpdateCount] = useState(0);
  const [userProduct, setUserProduct] = useState<userCart>();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCart, setIsCart] = useState(true);
  const pathname = usePathname();
  const [user, setUser] = useState<ExtenderUser | null>(null);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      const data = await currentUser();
      if (data) {
        setUser(data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getCartItembyId(user?.id!);

      if (data) {
        const localData = localStorage.setItem(
          "cartItems",
          JSON.stringify(data?.items),
        );

        setUserProduct(data);
        setLoading(false);
      }
    })();
  }, [updateCount]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(userProduct?.items));
    calculateTotal();
  }, [userProduct]);

  const calculateTotal = () => {
    const total = userProduct?.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );

    setTotal(total!);
  };

  useEffect(() => {
    const paths = [
      "/cart",
      "/checkout",
      "/stripe/purchase-success",
    ] as string[];
    const hideCart = paths.some((path) => pathname.includes(path));

    setIsCart(!hideCart);
  }, [pathname]);

  const handleCheckOut = () => {
    startTransition(async () => {
      if (userProduct?.items) {
        for (let item of userProduct?.items) {
          await cartQuantityUpdate(
            item.cartId,
            item.productId,
            item.sizeOption,
            item.sideOption,
            item.quantity,
          );
        }
        setUpdateCount((prv) => prv + 1);
      }
    });
  };

  const handleQuantityChange = (cartID: string, newQuantity: number) => {
    setUserProduct((currentItems) => {
      if (!currentItems) return currentItems;
      const updatedItems = currentItems?.items.map((item) => {
        if (item.id == cartID) {
          const itemTotal = parseFloat(
            (item.product.price * newQuantity).toFixed(2),
          );
          return {
            ...item,
            quantity: newQuantity,
            itemTotal: itemTotal,
          };
        }
        return item;
      });
      return {
        ...currentItems,
        items: updatedItems,
      };
    });
  };
  useEffect(() => {
    const handleTotalPriceChange = () => {
      const total = userProduct?.items.reduce(
        (total, item) => item.quantity * item.product.price + total,
        0,
      );
      if (total) {
        const formattedTotal = parseFloat(total?.toFixed(2));
        setTotal(formattedTotal);
      }
    };
    if (userProduct?.items.length! > 0) {
      handleTotalPriceChange();
    }
  }, [userProduct?.items]);

  const deleteCartAction = (
    cartId: string,
    productId: string,
    sizeOption: Size,
    sideOption: AddOns,
  ) => {
    startTransition(async () => {
      if (cartId) {
        setLoading(!loading);
        const result = await deleteCart(
          cartId,
          productId,
          sizeOption,
          sideOption,
        );

        setUpdateCount((count) => count + 1);
      } else {
        console.log("No CartId");
      }
      setLoading(!loading);
    });
  };

  return (
    <>
      <div>
        <Sheet>
          <SheetTrigger asChild className={isCart ? "block" : "hidden"}>
            <Button
              variant="outline"
              onClick={() => setUpdateCount((per) => per + 1)}
            >
              <div>
                <AiOutlineShoppingCart />
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent className="mt-12 flex flex-col gap-5">
            <SheetHeader className="mt-12">
              <SheetTitle>My Shopping Basket</SheetTitle>
              <SheetDescription>Enjoy shopping!</SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[70%] w-full rounded-md border">
              <>
                <div className="flex h-auto w-full items-center justify-start">
                  <div className="mx-auto p-3">
                    {user?.id && userProduct?.items.length! > 0 ? (
                      <>
                        <div>
                          {userProduct?.items.map((item, index) => {
                            let localCart = localStorage.getItem("cartItems");
                            let localItems = localCart
                              ? JSON.parse(localCart)
                              : [];
                            const localItem = localItems.find(
                              (localItem: any) => localItem.id === item.id,
                            );
                            const quantity = localItem
                              ? localItem.quantity
                              : item.quantity;
                            return (
                              <div className="p-3" key={index}>
                                <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-white p-3 shadow">
                                  <img
                                    src={item?.product?.image || undefined}
                                    className="h-auto max-w-[60px] items-center rounded-full object-cover"
                                  />
                                  <div className="flex flex-col items-center gap-2">
                                    <h1 className="text-md font-bold">
                                      {item?.product.name}
                                    </h1>
                                    <div className="text-sm">
                                      <h2>
                                        Size: {item?.sizeOption?.toUpperCase()}{" "}
                                        + (
                                        {formatPrice(
                                          ADDONSPRICE.size[
                                            item?.sizeOption as keyof typeof ADDONSPRICE.size
                                          ],
                                        )}
                                        )
                                      </h2>
                                      <h2>
                                        Side: {item?.sideOption?.toUpperCase()}{" "}
                                        + (
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
                                    <input
                                      className="w-16 rounded-lg border border-zinc-400 text-center"
                                      type="number"
                                      value={quantity}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          item.id,
                                          parseFloat(e.target.value),
                                        )
                                      }
                                      min={1}
                                    />
                                    <h1 className="mt-2 text-lg">
                                      Total:{" "}
                                      {formatPrice(
                                        item?.quantity! *
                                          (item?.product.price! +
                                            item?.extraPrice!),
                                      )}
                                    </h1>
                                  </div>
                                  <div className="sm:col-span-1 sm:ml-auto sm:justify-center">
                                    <Button
                                      size={"sm"}
                                      onClick={() =>
                                        deleteCartAction(
                                          item.cartId,
                                          item?.product.id,
                                          item?.sizeOption!,
                                          item?.sideOption!,
                                        )
                                      }
                                      className="m-2 rounded bg-red-500 p-2 text-white"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="h-30 sticky inset-x-0 bottom-0 w-full rounded-lg border border-orange-100 bg-white p-3">
                          <h1>Total: {formatPrice(total)}</h1>
                        </div>
                      </>
                    ) : (
                      <div
                        className={cn(
                          "mt-[70%] flex flex-col items-center justify-center gap-5",
                        )}
                      >
                        <h1 className="text-sm">Your shopping cart is empty</h1>
                        <Button>
                          <Link href={"/menu"}>Continue Shopping</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            </ScrollArea>
            <SheetFooter>
              <SheetTrigger asChild className="m-auto">
                <Button onClick={() => handleCheckOut()} asChild>
                  <Link href={"/cart"}>Checkout</Link>
                </Button>
              </SheetTrigger>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ShowUserCartFromDBSideTest;
