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
import { formatPrice } from "@/lib/formatPrice";
import { TUserOrder } from "@/lib/type";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { getuserOrderFromDB } from "@/data/getuserOrderFromDB";
import { useCurrentUser } from "@/hooks/use-current-user";
import MySpinner from "@/components/ui/MySpinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogDescription } from "@radix-ui/react-dialog";
import { currentUser } from "@/lib/auth";
import { User } from "@prisma/client";
import { ExtenderUser } from "@/next-auth";
import { cn } from "@/lib/utils";
import {
  addToCartFromUserOrder,
  addToCartFromUserOrderProps,
} from "@/actions/addToCartFromUserOder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const [user, setUser] = useState<ExtenderUser | null>(null);
  const [products, setProduct] = useState<TUserOrder[] | null>();
  const [routeNumber, setRouteNamber] = useState(0);
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
      if (user) {
        const data = await getuserOrderFromDB(user?.id!);
        const products = data.filter((item) => !(item.status === "PENDING"));
        setProduct(products);
      }
    })();
  }, [user]);

  if (!products) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-3">
        <MySpinner />
        <Button asChild variant={"link"} size={"sm"}>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
    );
  }
  if (products && products.length === 0) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-3">
        <div className="text-2xl">No Order yet</div>
        <Button asChild size={"lg"} className="mx-auto">
          <Link href={"/menu"}>Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const buyAgainOnClickHandler = async (userId: string, orderId: string) => {
    startTransition(async () => {
      if (user) {
        const data: addToCartFromUserOrderProps = {
          orderId: orderId,
          user: user,
        };
        await addToCartFromUserOrder(data).then((data) => {
          if (data.success) {
            toast.success("Items Reordered.");
            setRouteNamber((prev) => prev + 1);
            route.push(
              `/order?id=${products.map((item) => item.id)}&u=${routeNumber}`,
            );
          } else {
            toast.error(data.error);
          }
        });
      } else {
        console.error("User not found");
      }
    });
  };

  return (
    <MaxWidthWrapper>
      <div className="flex justify-center p-5">
        <h1 className="text-3xl font-bold text-zinc-600">My Orders</h1>
      </div>
      {products.map((product) => (
        <Card className="m-5 p-5" key={product.createdAt.getMilliseconds()}>
          <CardHeader className="text-lg">
            <CardDescription className="flex flex-col">
              <div className="flex flex-col justify-between sm:flex-row">
                <div className="font-bold text-zinc-600">
                  Order reference: {product?.id}
                </div>
                <div className="font-bold">
                  <span className="mr-3">Delivery Status:</span>
                  <span
                    className={cn(
                      product.deliveryStatus === "PREPARING"
                        ? "text-yellow-500"
                        : product.deliveryStatus === "DISPATCHED"
                          ? "text-orange-500"
                          : "text-green-500",
                    )}
                  >
                    {product.deliveryStatus}
                  </span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>

          <div className="text-md flex min-h-full flex-col justify-center p-3 font-bold text-zinc-500">
            <div>Ordered:</div>
            <div className="flex justify-between">
              <div className="flex gap-6">
                <div>
                  {`${product.updatedAt.getDate()}/${
                    product.updatedAt.getMonth() + 1
                  }/${product.updatedAt.getFullYear()}`}
                </div>
                <div>
                  {`${product.updatedAt.getHours()}:${product.updatedAt.getMinutes().toString().padStart(2, "0")}`}
                </div>
              </div>
              <div>{formatPrice(product.orderPrice)}</div>
            </div>
            <div className="mt-3">Delivery Address:</div>
            <div>{product.deliveryAddress}</div>
          </div>

          <Dialog>
            <DialogTrigger className="flex w-full justify-center p-3 font-bold text-zinc-500">
              <div className="rounded-xl p-3 ring-1 ring-zinc-500">
                Show Details
              </div>
            </DialogTrigger>
            <DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogTitle>
            <DialogContent className="h-[500px]">
              <DialogHeader className="p-6">
                <div className="flex justify-between">
                  <div className="font-bold text-zinc-500">
                    Order reference: {product?.id}
                  </div>
                </div>
              </DialogHeader>
              <ScrollArea className="h-full w-full rounded-md border">
                <div className="mx-auto w-full max-w-5xl space-y-8">
                  <div>
                    {product?.orderItems.map((product) => (
                      <Card
                        className="m-5 flex flex-col items-center gap-5 p-5"
                        key={product.id}
                      >
                        <div className="grid grid-cols-2 items-center gap-5">
                          <img
                            src={product.product.image || undefined}
                            alt=""
                            className="col-span-1 max-w-[100px] rounded-full"
                          />
                          <h1 className="col-span-1">{product.product.name}</h1>
                          <div className="col-span-1 text-sm">
                            <h2>
                              Size: {product?.sizeOption?.toUpperCase()} <br />+
                              (
                              {formatPrice(
                                ADDONSPRICE.size[
                                  product?.sizeOption as keyof typeof ADDONSPRICE.size
                                ],
                              )}
                              )
                            </h2>
                            <h2>
                              Side: {product?.sideOption?.toUpperCase()}
                              <br /> + (
                              {formatPrice(
                                ADDONSPRICE.addOns[
                                  product?.sideOption as keyof typeof ADDONSPRICE.addOns
                                ],
                              )}
                              )
                            </h2>
                          </div>
                          <h1 className="col-span-1">
                            Quantity: {product.quantity}
                          </h1>
                          <h1 className="col-span-2 ml-auto">
                            Price:
                            {formatPrice(
                              (product.price + product.extraPrice) *
                                product.quantity,
                            )}
                          </h1>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </ScrollArea>
              <div className="flex items-center justify-between">
                <Button
                  onClick={() => buyAgainOnClickHandler(user?.id!, product.id)}
                >
                  Buy Again
                </Button>
                <h1 className="flex justify-end text-xl">
                  Order Total:{formatPrice(product?.orderPrice!)}{" "}
                </h1>
              </div>
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
