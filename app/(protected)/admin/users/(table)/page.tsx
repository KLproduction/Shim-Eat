import { getOrderFromDB } from "@/data/getOrderFromDB";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Product, User } from "@prisma/client";
import { getProducts } from "@/data/getProducts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExtenderUser } from "@/next-auth";
import { getAllUser } from "@/data/getAllUser";

const UserTablePage = async () => {
  const data: User[] | undefined = await getAllUser();

  return (
    <div className="container mx-auto pb-20 sm:py-10">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default UserTablePage;
