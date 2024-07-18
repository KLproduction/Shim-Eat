"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ADDONSPRICE } from "@/data/products";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/formatPrice";
import { TUserOrder } from "@/lib/type";
import { revalidatePath } from "next/cache";
import Link from "next/link";
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
import { useEffect, useState } from "react";
import { ExtenderUser } from "@/next-auth";
import { getuserOrderFromDB } from "@/data/getuserOrderFromDB";
import { useCurrentUser } from "@/hooks/use-current-user";
import MySpinner from "@/components/ui/MySpinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const OrderPage = () => {
  // const [user, setUser] = useState<ExtenderUser>();
  const [products, setProduct] = useState<TUserOrder[] | null>();

  const user = useCurrentUser();
  useEffect(() => {
    (async () => {
      if (user) {
        const products = await getuserOrderFromDB(user?.id!);
        setProduct(products);
      }
    })();
  }, [user]);

  if (!products) {
    return (
      <div className="flex flex-col justify-center items-center min-h-full gap-3">
        <MySpinner />
        <Button asChild variant={"link"} size={"sm"}>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="flex justify-center p-5">
        <h1 className=" font-bold text-zinc-600 text-3xl">My Orders</h1>
      </div>
      {products.map((product) => (
        <Card className="m-5 p-5" key={product.createdAt.getMilliseconds()}>
          <CardHeader className="text-lg">
            <div className="flex flex-col sm:flex-row justify-between ">
              <div className="text-zinc-600 font-bold">
                Order reference: {product?.id}
              </div>
              <div className="text-green-500 font-bold">{product.status}</div>
            </div>
          </CardHeader>

          <div className=" flex justify-center min-h-full flex-col text-md text-zinc-500 font-bold p-3">
            <div>Ordered:</div>
            <div className=" flex justify-between">
              <div className="flex gap-6">
                <div>
                  {`${product.updatedAt.getDate()}/${
                    product.updatedAt.getMonth() + 1
                  }/${product.updatedAt.getFullYear()}`}
                </div>
                <div>
                  {`${product.updatedAt.getHours()}:${product.updatedAt.getMinutes()}`}
                </div>
              </div>
              <div>{formatPrice(product.orderPrice)}</div>
            </div>
          </div>

          <Dialog>
            <DialogTrigger className="w-full flex justify-center p-3 text-zinc-500 font-bold">
              <div className="ring-1 ring-zinc-500 p-3 rounded-xl">
                Show Details
              </div>
            </DialogTrigger>
            <DialogContent className="h-[500px]">
              <DialogHeader className="p-6">
                <div className="flex justify-between ">
                  <div className="text-zinc-500 font-bold">
                    Order reference: {product?.id}
                  </div>
                  <div className="text-green-500 font-bold">
                    {product.status}
                  </div>
                </div>
              </DialogHeader>
              <ScrollArea className="w-full h-full rounded-md border">
                <div className="max-w-5xl w-full mx-auto space-y-8">
                  <div>
                    {product?.orderItems.map((product) => (
                      <Card
                        className="flex flex-col items-center gap-5 m-5 p-5"
                        key={product.id}
                      >
                        <div className=" grid grid-cols-2 items-center gap-5">
                          <img
                            src={product.product.image || undefined}
                            alt=""
                            className="max-w-[100px] rounded-full col-span-1"
                          />
                          <h1 className=" col-span-1">
                            {product.product.name}
                          </h1>
                          <div className="text-sm col-span-1">
                            <h2>
                              Size: {product?.sizeOption?.toUpperCase()} <br />+
                              (
                              {formatPrice(
                                ADDONSPRICE.size[
                                  product?.sizeOption as keyof typeof ADDONSPRICE.size
                                ]
                              )}
                              )
                            </h2>
                            <h2>
                              Side: {product?.sideOption?.toUpperCase()}
                              <br /> + (
                              {formatPrice(
                                ADDONSPRICE.addOns[
                                  product?.sideOption as keyof typeof ADDONSPRICE.addOns
                                ]
                              )}
                              )
                            </h2>
                          </div>
                          <h1 className="col-span-1">
                            Quantity: {product.quantity}
                          </h1>
                          <h1 className=" col-span-2 ml-auto">
                            Price:
                            {formatPrice(
                              (product.price + product.extraPrice) *
                                product.quantity
                            )}
                          </h1>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </ScrollArea>
              <h1 className="text-xl flex justify-end">
                Order Total:{formatPrice(product?.orderPrice!)}{" "}
              </h1>
            </DialogContent>
          </Dialog>
        </Card>
      ))}
      <div className="flex justify-end p-5">
        <Button asChild variant={"link"} size={"lg"}>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default OrderPage;
