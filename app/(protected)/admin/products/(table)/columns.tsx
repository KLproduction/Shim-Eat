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
import { Product } from "@prisma/client";
import { NavigateButton } from "../../order/_components/NavigateButton";

export const columns: ColumnDef<Product>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

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
            <DropdownMenuItem>
              <NavigateButton
                to={`/admin/products/product-details?product=${product.id}`}
              >
                <span className="text-orange-500">View Product Details</span>
              </NavigateButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy Product ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <div className="flex justify-center">Image</div>;
    },
    cell: ({ row }) => {
      const data = row.getValue("image") as string;
      return (
        <div className="flex items-center justify-center">
          <img
            src={data || undefined}
            alt="image"
            className="max-w-[80px] rounded-full ring-2 ring-green-500"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          className="flex items-center gap-3"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          {isSortedAsc === "asc" && <AiOutlineCaretUp />}
          {isSortedAsc === "desc" && <AiOutlineCaretDown />}
          {!isSortedAsc && (
            <div>
              <BsChevronExpand />
            </div>
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex justify-center">
          <Button
            className="flex items-center justify-center gap-3"
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            {isSortedAsc === "asc" && <AiOutlineCaretUp />}
            {isSortedAsc === "desc" && <AiOutlineCaretDown />}
            {!isSortedAsc && (
              <div>
                <BsChevronExpand />
              </div>
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("category") as string;
      const formattedData =
        data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
      return <div className="flex justify-center">{formattedData}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex justify-center">
          <Button
            variant={"ghost"}
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            <div>Status</div>
            <div>
              {isSortedAsc === "asc" && <AiOutlineCaretUp />}
              {isSortedAsc === "desc" && <AiOutlineCaretDown />}
              {!isSortedAsc && <BsChevronExpand />}
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("status") as string;
      const formattedData = data.toLocaleUpperCase();
      return (
        <div className="text-center">
          <span
            className={
              data === "onSale"
                ? "font-bold text-green-500"
                : "font-bold text-red-500"
            }
          >
            {formattedData}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "price",
    header: () => <div className="text-center">Product Price</div>,
    cell: ({ row }) => {
      const data = row.getValue("price") as number;
      const formattedPrice = formatPrice(data);
      return <div className="text-center">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Product ID</div>,
    cell: ({ row }) => {
      const data = row.getValue("id") as number;
      return <div className="text-center">{data}</div>;
    },
  },
];
