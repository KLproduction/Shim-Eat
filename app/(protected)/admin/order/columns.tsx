"use client";

import { formatPrice } from "@/lib/formatPrice";
import { TUserOrder } from "@/lib/type";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";
import { startTransition, useTransition } from "react";
import { deleteSigalUserOrder } from "@/actions/deleteSigalUserOrder";
import { toast } from "sonner";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";
import { NavigateButton } from "./_components/NavigateButton";

export const columns: ColumnDef<TUserOrder>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-start">
              <NavigateButton
                to={`/admin/order/order-details?order=${order.id}`}
              >
                <span className="text-orange-500">View order details</span>
              </NavigateButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy order ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: "clientEmail",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          className="flex items-center gap-3"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client email
          {isSortedAsc === "asc" && <AiOutlineCaretUp />}
          {isSortedAsc === "desc" && <AiOutlineCaretDown />}
          {!isSortedAsc && (
            <div className="rotate-">
              <BsChevronExpand />
            </div>
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "deliveryAddress",
    header: "DeliveryAddress",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <div className="flex items-center justify-center gap-1">
            <div>Status</div>
            <div>
              {isSortedAsc === "asc" && <AiOutlineCaretUp />}
              {isSortedAsc === "desc" && <AiOutlineCaretDown />}
              {!isSortedAsc && <BsChevronExpand />}
            </div>
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("status") as string;
      return (
        <div className="flex justify-center">
          <span
            className={
              data === "CANCELLED"
                ? "font-bold text-red-800"
                : data === "PENDING"
                  ? "font-bold text-zinc-600"
                  : "font-bold text-green-500"
            }
          >
            {data}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <div className="flex items-center justify-start gap-1">
            <div>Delivery Status</div>
            <div>
              {isSortedAsc === "asc" && <AiOutlineCaretUp />}
              {isSortedAsc === "desc" && <AiOutlineCaretDown />}
              {!isSortedAsc && <BsChevronExpand />}
            </div>
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("deliveryStatus") as string;
      return (
        <div className="flex justify-center">
          <span
            className={
              data === "DELIVERED"
                ? "font-bold text-green-500"
                : data === "DISPATCHED"
                  ? "font-bold text-orange-500"
                  : "font-bold text-zinc-500"
            }
          >
            {data}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <div className="flex items-center justify-start gap-1">
            <div>First Create</div>
            <div>
              {isSortedAsc === "asc" && <AiOutlineCaretUp />}
              {isSortedAsc === "desc" && <AiOutlineCaretDown />}
              {!isSortedAsc && <BsChevronExpand />}
            </div>
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("createdAt") as string;
      const date = new Date(data);
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        year: "numeric",
        month: "numeric",
        day: "numeric",

        hour12: false,
      }).format(date);

      const formattedTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);
      return (
        <div className="text-center">
          {formattedDate}
          <br />
          {formattedTime}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <div className="flex items-center justify-start gap-1">
            <div>Lastest Update</div>
            <div>
              {isSortedAsc === "asc" && <AiOutlineCaretUp />}
              {isSortedAsc === "desc" && <AiOutlineCaretDown />}
              {!isSortedAsc && <BsChevronExpand />}
            </div>
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("createdAt") as string;
      const date = new Date(data);
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour12: false,
      }).format(date);
      const formattedTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);
      return (
        <div className="text-center">
          {formattedDate}
          <br />
          {formattedTime}
        </div>
      );
    },
  },
  {
    accessorKey: "orderPrice",
    header: () => <div className="text-center">Order Price</div>,
    cell: ({ row }) => {
      const data = row.getValue("orderPrice") as number;
      const formattedPrice = formatPrice(data);
      return <div className="text-center">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "amountReceived",
    header: () => <div className="text-start">Amount Received</div>,
    cell: ({ row }) => {
      const data = row.getValue("amountReceived") as number;
      const formattedPrice = data > 0 ? formatPrice(data) : "null";
      return <div className="text-center">{formattedPrice}</div>;
    },
  },

  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
  },
  {
    accessorKey: "userId",
    header: () => <div className="text-center">User ID</div>,
  },
];
