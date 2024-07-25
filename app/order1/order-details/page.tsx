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
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { getOrderByOrderID } from "@/data/getOrderByOrderID";
import ChangeDeliveryStatusForm from "../_components/ChangeDeliveryStatusForm";
import { DeliveryStatus, OrderStatus } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const OrderPage = () => {
  const [product, setProduct] = useState<TUserOrder | null>();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>();

  useEffect(() => {
    (async () => {
      if (orderId) {
        const products = await getOrderByOrderID(orderId);
        setProduct(products);
        setOrderStatus(products?.status);
      }
    })();
  }, []);

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-full gap-3">
        <MySpinner />
        <Button asChild variant={"link"} size={"sm"}>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
    );
  }

  const orderColor = "text-green-500"
    ? orderStatus === "PAID"
    : "text-orange-500";

  return (
    <MaxWidthWrapper className="flex justify-center flex-col gap-5">
      <div className="flex justify-center p-5">
        <h1 className=" font-bold text-zinc-600 text-3xl">Order Details</h1>
      </div>
      <Card className="m-5 p-5">
        {product && (
          <>
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

            <div className="flex justify-between p-3 ">
              <div className="text-zinc-500 font-bold">
                Order reference: {product?.id}
              </div>
              <div className={`text-green-500 font-bold`}>{product.status}</div>
            </div>

            <div className="max-w-5xl w-full mx-auto space-y-8">
              <div>
                {product?.orderItems.map((product) => (
                  <div
                    className="flex flex-col items-center gap-5 m-5 p-5"
                    key={product.id}
                  >
                    <div className=" grid grid-cols-2 items-center gap-5">
                      <img
                        src={product.product.image || undefined}
                        alt=""
                        className="max-w-[100px] rounded-full col-span-1"
                      />
                      <h1 className=" col-span-1">{product.product.name}</h1>
                      <div className="text-sm col-span-1">
                        <h2>
                          Size: {product?.sizeOption?.toUpperCase()} <br />+ (
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
                  </div>
                ))}
                <h2 className="text-xl flex justify-end text-zinc-600">
                  Order Total:{formatPrice(product?.orderPrice!)}{" "}
                </h2>
              </div>
            </div>
            <Card className="mt-5">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div>
                  <Label>Email:</Label>
                  <h2>{product.clientEmail}</h2>
                </div>
                <div>
                  <Label>Delivery Address:</Label>
                  <h2>{product.deliveryAddress}</h2>
                </div>
                <div>
                  <Label>Amount Received:</Label>
                  <h2>{formatPrice(product.amountReceived!)}</h2>
                </div>
                <div>
                  <Label>Created at:</Label>
                  <h2>
                    {`${product.createdAt.getDate()}/${
                      product.createdAt.getMonth() + 1
                    }/${product.createdAt.getFullYear()}`}
                    <br />
                    {`${product.createdAt.getHours()}:${product.createdAt.getMinutes()}`}
                  </h2>
                </div>
                <div>
                  <Label>Last Updated at:</Label>
                  <h2>
                    {`${product.updatedAt.getDate()}/${
                      product.updatedAt.getMonth() + 1
                    }/${product.updatedAt.getFullYear()}`}
                    <br />
                    {`${product.updatedAt.getHours()}:${product.updatedAt.getMinutes()}`}
                  </h2>
                </div>
                <ChangeDeliveryStatusForm orderId={product.id} />
              </CardContent>
            </Card>
          </>
        )}
        <div className="flex justify-end p-5">
          <Button asChild variant={"outline"} size={"lg"}>
            <Link href={"/admin/order"}>Back</Link>
          </Button>
        </div>
      </Card>
    </MaxWidthWrapper>
  );
};

export default OrderPage;
