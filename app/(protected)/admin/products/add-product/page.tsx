import { checkServerSession } from "@/actions/check-server-session";
import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminShell from "@/components/admin/admin-shell";
import React from "react";
import AddProductForm from "./_components/AddProductForm";

const addProductPage = async () => {
  await checkServerSession();

  return (
    <AdminShell className="gap-8">
      <AdminPageHeader
        eyebrow="Products"
        title="Add a new product"
        description="Create a new menu item with clean merchandising details, status, pricing, and media."
      />
      <div className="overflow-auto">
        <AddProductForm />
      </div>
    </AdminShell>
  );
};

export default addProductPage;
