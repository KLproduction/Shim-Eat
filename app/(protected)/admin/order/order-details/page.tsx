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
import { useEffect, useState, useTransition } from "react";
import { getuserOrderFromDB } from "@/data/getuserOrderFromDB";
import { useCurrentUser } from "@/hooks/use-current-user";
import MySpinner from "@/components/ui/MySpinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { getOrderByOrderID } from "@/data/getOrderByOrderID";
import ChangeDeliveryStatusForm from "../_components/ChangeDeliveryStatusForm";
import { DeliveryStatus, OrderStatus, Product } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import ChangeOrderStatusForm from "../_components/ChangeOrderStatusForm";
import { deleteSigalUserOrder } from "@/actions/deleteSigalUserOrder";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const OrderPage = () => {
  const [product, setProduct] = useState<TUserOrder | null>();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [pending, startTransition] = useTransition();
  const route = useRouter();

  useEffect(() => {
    (async () => {
      if (orderId) {
        const data = await getOrderByOrderID(orderId);
        setProduct(data);
      }
    })();
  }, []);

  if (!product) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-3">
        <MySpinner />
        <Button asChild variant={"link"} size={"sm"}>
          <div className="mt-10">
            <Link href={"/admin/order"}>Back</Link>
          </div>
        </Button>
      </div>
    );
  }

  const onClickDeleteHandler = (orderId: string) => {
    startTransition(async () => {
      await deleteSigalUserOrder(orderId).then((data) => {
        toast.success(data.message);
        route.refresh();
        route.push("/admin/order");
      });
    });
  };

  return (
    <MaxWidthWrapper className="flex flex-col justify-center gap-5">
      <div className="flex justify-center p-5">
        <h1 className="text-3xl font-bold text-orange-500">Order Details</h1>
      </div>
      <Card className="m-5 p-5">
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="flex justify-end" asChild>
              <Button variant={"destructive"}>Delete</Button>
            </DialogTrigger>
            <DialogContent className="h-[150px] w-auto border-none bg-transparent bg-white p-0 shadow-lg">
              <Card>
                <DialogHeader>
                  <DialogTitle>
                    <div className="mt-6 flex items-center justify-center gap-3 border-red-700 p-5 text-red-700">
                      <ExclamationTriangleIcon />
                      Warning: Deleted Order Data is Unrecoverable
                    </div>
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <DialogTrigger asChild>
                  <div className="my-auto flex items-center justify-center gap-5">
                    <Button variant={"outline"}>Cancel</Button>
                    <Button
                      onClick={() => onClickDeleteHandler(product.id)}
                      variant={"destructive"}
                      disabled={pending}
                      className="p-2"
                    >
                      Delete
                    </Button>
                  </div>
                </DialogTrigger>
              </Card>
            </DialogContent>
          </Dialog>
        </div>

        {product && (
          <div>
            <div className="text-md flex min-h-full flex-col justify-center p-3 font-bold text-zinc-500">
              <div>Order:</div>
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
            </div>

            <div className="flex justify-between p-3">
              <div className="font-bold text-zinc-500">
                Order reference: {product?.id}
              </div>
              <span
                className={
                  product.status === "PENDING"
                    ? "text-orange-500"
                    : product.status === "CANCELLED"
                      ? "text-red-500"
                      : "text-green-500"
                }
              >
                {product.status}
              </span>
            </div>

            <div className="mx-auto w-full max-w-5xl space-y-8">
              <div>
                {product?.orderItems.map((product) => (
                  <Card
                    className="m-5 grid grid-cols-1 items-center justify-around gap-5 p-8"
                    key={product.id}
                  >
                    <div className="flex flex-col items-center gap-5 sm:grid sm:grid-cols-2">
                      <img
                        src={product.product.image || undefined}
                        alt=""
                        className="col-span-1 max-w-[100px] rounded-full"
                      />
                      <h1 className="col-span-1">{product.product.name}</h1>
                      <div className="col-span-1 text-sm">
                        <h2>
                          Size: {product?.sizeOption?.toUpperCase()} <br />+ (
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
                <h2 className="flex justify-end text-xl text-zinc-600">
                  Order Total:{formatPrice(product?.orderPrice!)}{" "}
                </h2>
              </div>
            </div>
            <Card className="mt-5 grid justify-center">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>Order ID: {product.id}</CardDescription>
                <CardDescription>User ID: {product.userId}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <Label>Email:</Label>
                    <h2 className="text-zinc-600">{product.clientEmail}</h2>
                  </div>
                  <div>
                    <Label>Delivery Address:</Label>
                    <h2 className="text-zinc-600">{product.deliveryAddress}</h2>
                  </div>
                  <div>
                    <Label>Amount Received:</Label>
                    <h2 className="text-zinc-600">
                      {formatPrice(product.amountReceived!)}
                    </h2>
                  </div>
                  <div>
                    <Label>Created at:</Label>
                    <h2 className="text-zinc-600">
                      {`${product.createdAt.getDate()}/${
                        product.createdAt.getMonth() + 1
                      }/${product.createdAt.getFullYear()}`}
                      <br />
                      {`${product.createdAt.getHours()}:${product.createdAt.getMinutes()}`}
                    </h2>
                  </div>
                  <div>
                    <Label>Last Updated at:</Label>
                    <h2 className="text-zinc-600">
                      {`${product.updatedAt.getDate()}/${
                        product.updatedAt.getMonth() + 1
                      }/${product.updatedAt.getFullYear()}`}
                      <br />
                      {`${product.updatedAt.getHours()}:${product.updatedAt.getMinutes()}`}
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ChangeOrderStatusForm orderId={product.id} />
                  <ChangeDeliveryStatusForm orderId={product.id} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div className="flex justify-end p-5">
          <Button
            asChild
            variant={"outline"}
            size={"lg"}
            onClick={() => route.refresh()}
          >
            <Link href={"/admin/order"}>Back</Link>
          </Button>
        </div>
      </Card>
    </MaxWidthWrapper>
  );
};

export default OrderPage;
