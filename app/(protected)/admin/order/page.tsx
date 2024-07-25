import { getOrderFromDB } from "@/data/getOrderFromDB";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { TUserOrder } from "@/lib/type";

const UserOrderTablePage = async () => {
  const data: TUserOrder[] | undefined = await getOrderFromDB();

  return (
    <div className="container mx-auto py-10">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default UserOrderTablePage;
