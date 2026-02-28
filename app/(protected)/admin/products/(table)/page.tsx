import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Product } from "@prisma/client";
import { getProducts } from "@/data/getProducts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminShell from "@/components/admin/admin-shell";

const ProductTablePage = async () => {
  const data: Product[] | undefined = await getProducts();

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Products"
        title="Catalogue management"
        description="Tune your menu mix, retire unavailable items, and keep product content polished."
        actions={
          <Button
            className="h-11 rounded-2xl bg-slate-950 px-5 text-white hover:bg-slate-950/90"
            asChild
          >
            <Link href={"/admin/products/add-product"}>Add product</Link>
          </Button>
        }
      />
      {data && <DataTable columns={columns} data={data} />}
    </AdminShell>
  );
};

export default ProductTablePage;
