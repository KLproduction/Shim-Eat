import { getOrderFromDB } from "@/data/getOrderFromDB";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { TUserOrder } from "@/lib/type";
import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminShell from "@/components/admin/admin-shell";

const UserOrderTablePage = async () => {
  const data: TUserOrder[] | undefined = await getOrderFromDB();

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Orders"
        title="Order management"
        description="Keep the kitchen, dispatch, and payment states aligned with a cleaner operational workflow."
      />
      {data && <DataTable columns={columns} data={data} />}
    </AdminShell>
  );
};

export default UserOrderTablePage;
