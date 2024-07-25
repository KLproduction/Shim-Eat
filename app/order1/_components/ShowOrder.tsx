"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MySpinner from "@/components/ui/MySpinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderFromDB } from "@/data/getOrderFromDB";

import { formatPrice } from "@/lib/formatPrice";
import { TUserOrder } from "@/lib/type";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import React, { useEffect, useState } from "react";

const ShowOrder = () => {
  const [order, setOrder] = useState<TUserOrder[] | null>();

  useEffect(() => {
    (async () => {
      const data = await getOrderFromDB();

      setOrder(data);
    })();
  }, []);

  if (!order) {
    <MySpinner />;
  }

  return (
    <>
      <MaxWidthWrapper className="flex flex-col justify-center items-center">
        <Card className="w-auto hidden sm:block">
          <Table className="p-3  text-xs sm:text-md mx-auto">
            <TableCaption>Existing Orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">OrderID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>OrderPrice</TableHead>
                <TableHead className="">AmountReceived</TableHead>
                <TableHead className="">DeliveryAddress</TableHead>
                <TableHead className="">Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>OrderStatus</TableHead>
                <TableHead>DeliveryStatus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.map((order) => (
                <TableRow key={order.id} className=" bg-zinc-50 ">
                  <TableCell className="">{order.id}</TableCell>
                  <TableCell>{order.clientEmail}</TableCell>
                  <TableCell>{formatPrice(order?.orderPrice)}</TableCell>
                  <TableCell className="">
                    {order.amountReceived
                      ? formatPrice(order?.amountReceived)
                      : null}
                  </TableCell>

                  <TableCell className="">
                    {order.deliveryAddress ? order.deliveryAddress : null}
                  </TableCell>
                  <TableCell className="">
                    {`${order.createdAt.getDate()}/${
                      order.createdAt.getMonth() + 1
                    }/${order.createdAt.getFullYear()}`}
                    <br />
                    {`${order.createdAt.getHours()}:${order.createdAt.getMinutes()}`}
                  </TableCell>
                  <TableCell>
                    {`${order.updatedAt.getDate()}/${
                      order.updatedAt.getMonth() + 1
                    }/${order.updatedAt.getFullYear()}`}
                    <br />
                    {`${order.updatedAt.getHours()}:${order.updatedAt.getMinutes()}`}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.deliveryStatus}</TableCell>
                  <TableCell>
                    <Button asChild variant={"link"}>
                      <Link
                        href={`/admin/order/order-details?order=${order.id}`}
                      >
                        Order Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card className="w-auto sm:hidden">
          <Table className="p-0 text-xs">
            <TableCaption>Existing Orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>DeliveryAddress</TableHead>
                <TableHead>OrderStatus</TableHead>
                <TableHead>DeliveryStatus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.map((order) => (
                <TableRow key={order.id} className=" bg-zinc-50 ">
                  <TableCell className="">
                    {order.deliveryAddress ? order.deliveryAddress : null}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.deliveryStatus}</TableCell>

                  <Button asChild variant={"link"}>
                    <Link href={`/admin/order/order-details?order=${order.id}`}>
                      <AiOutlineMenu />
                    </Link>
                  </Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

export default ShowOrder;
