"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ADDONSPRICE } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import { TUserOrder } from "@/lib/type";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@prisma/client";
import { getUserById } from "@/data/user";
import Settingform from "@/components/auth/SettingForm";
import { ExtenderUser } from "@/next-auth";
import SettingformAdmin from "./_components/SettingFormAdmin";
import { currentUser } from "@/lib/auth";

const UserDetailsPage = () => {
  const [products, setProduct] = useState<TUserOrder[] | null>();
  const [user, setUser] = useState<User | null>();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user");
  const route = useRouter();

  //   useEffect(() => {
  //   (async () => {
  //     const user = await currentUser();
  //     if (user?.role !== "ADMIN") {
  //       route.push("/");
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      if (userId) {
        const products = await getuserOrderFromDB(userId);
        setProduct(products);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const data = await getUserById(userId);
          setUser(data);
        } catch (e) {
          console.error("Failed to fetch user:", e);
        }
      }
    })();
  }, [userId]);

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

  console.log(products);

  return (
    <MaxWidthWrapper>
      <section>
        <Card className="font-bold text-zinc-600">
          <CardHeader className="text-lg">
            <div className="flex flex-col justify-between sm:flex-row"></div>
          </CardHeader>
          <CardContent className="flex justify-center">
            {user && <SettingformAdmin user={user} />}
          </CardContent>
        </Card>
      </section>
      {products.length > 0 ? (
        <section>
          <Card className="mt-5">
            <div className="flex justify-center p-5">
              <h1 className="text-3xl font-bold text-zinc-600">User Orders</h1>
            </div>
            {products.map((product) => (
              <Card
                className="m-5 p-5"
                key={product.createdAt.getMilliseconds()}
              >
                <CardHeader className="text-lg">
                  <div className="flex flex-col justify-between sm:flex-row">
                    <div className="text-xs font-bold text-zinc-600 sm:text-lg">
                      Order reference: {product?.id}
                    </div>
                    <div className="font-bold text-green-500">
                      {product.status}
                    </div>
                  </div>
                  <CardDescription className="flex flex-col">
                    <p>Delivery Address:</p>
                    <p>{product.deliveryAddress}</p>
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
                        {`${product.updatedAt.getHours()}:${product.updatedAt.getMinutes()}`}
                      </div>
                    </div>
                    <div>{formatPrice(product.orderPrice)}</div>
                  </div>
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
                        <div className="font-bold text-green-500">
                          {product.status}
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
                                <h1 className="col-span-1">
                                  {product.product.name}
                                </h1>
                                <div className="col-span-1 text-sm">
                                  <h2>
                                    Size: {product?.sizeOption?.toUpperCase()}{" "}
                                    <br />+ (
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
                    <h1 className="flex justify-end text-xl">
                      Order Total:{formatPrice(product?.orderPrice!)}{" "}
                    </h1>
                  </DialogContent>
                </Dialog>
              </Card>
            ))}
            <div className="flex justify-center p-5">
              <Button asChild size={"lg"}>
                <Link href={"/admin/users"}>Back</Link>
              </Button>
            </div>
          </Card>
        </section>
      ) : (
        <section className="mt-5">
          <Card>
            <div className="flex justify-center p-5">
              <h1 className="text-3xl font-bold text-zinc-600">
                User Orders is Empty.
              </h1>
            </div>
            <div className="flex justify-center p-5">
              <Button asChild size={"lg"}>
                <Link href={"/admin/users"}>Back</Link>
              </Button>
            </div>
          </Card>
        </section>
      )}
    </MaxWidthWrapper>
  );
};

export default UserDetailsPage;
