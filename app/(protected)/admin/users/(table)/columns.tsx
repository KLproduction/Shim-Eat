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
import { Product, User } from "@prisma/client";
import { NavigateButton } from "../../order/_components/NavigateButton";
import { ExtenderUser } from "@/next-auth";

export const columns: ColumnDef<User>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
              <NavigateButton to={`/admin/users/user-details?user=${user.id}`}>
                <span className="text-orange-500">View User Details</span>
              </NavigateButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          Name
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
    accessorKey: "email",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex justify-center">
          <Button
            className="flex items-center justify-center gap-3"
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
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
      const data = row.getValue("email") as string;

      return <div className="flex justify-center">{data}</div>;
    },
  },
  {
    accessorKey: "totalSpend",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex justify-center">
          <Button
            className="flex items-center justify-center gap-3"
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Spend
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
      const data = row.getValue("totalSpend") as number;
      const formattedData = formatPrice(data);
      return <div className="flex justify-center">{formattedData}</div>;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex justify-center">
          <Button
            className="flex items-center justify-center gap-3"
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
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
      const data = row.getValue("role") as number;
      return <div className="text-center">{data}</div>;
    },
  },
  {
    accessorKey: "emailVerified",
    header: () => <div className="text-center">Email Verified</div>,
    cell: ({ row }) => {
      const data = row.getValue("emailVerified");
      const formattedData = data ? "Yes" : ("No" as string);

      return <div className="text-center">{formattedData}</div>;
    },
  },

  {
    accessorKey: "id",
    header: () => <div className="text-center">User ID</div>,
    cell: ({ row }) => {
      const data = row.getValue("id") as number;
      return <div className="text-center">{data}</div>;
    },
  },
];
