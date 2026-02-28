import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { User } from "@prisma/client";
import { getAllUser } from "@/data/getAllUser";
import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminShell from "@/components/admin/admin-shell";

const UserTablePage = async () => {
  const data: User[] | undefined = await getAllUser();

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Users"
        title="Customer accounts"
        description="Inspect account health, permissions, and spend patterns with a more readable customer workspace."
      />
      {data && <DataTable columns={columns} data={data} />}
    </AdminShell>
  );
};

export default UserTablePage;
