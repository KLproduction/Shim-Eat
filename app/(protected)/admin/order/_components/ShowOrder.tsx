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
    <div>
      <MaxWidthWrapper>
        <Card>
          <Table className="p-3 max-w-[300px] sm:max-w-full text-xs sm:text-md mx-auto">
            <TableCaption>A list of existing products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>OrderID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>OrderPrice</TableHead>
                <TableHead>AmountReceived</TableHead>
                <TableHead>OrderStatus</TableHead>
                <TableHead>DeliveryStatus</TableHead>
                <TableHead>DeliveryAddress</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.map((order) => (
                <TableRow key={order.id} className=" bg-zinc-50 ">
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.clientEmail}</TableCell>
                  <TableCell>{formatPrice(order?.orderPrice)}</TableCell>
                  <TableCell>
                    {order.amountReceived
                      ? formatPrice(order?.amountReceived)
                      : null}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.deliveryStatus}</TableCell>

                  <TableCell>
                    {order.deliveryAddress ? order.deliveryAddress : null}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
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
      </MaxWidthWrapper>
    </div>
  );
};

export default ShowOrder;
