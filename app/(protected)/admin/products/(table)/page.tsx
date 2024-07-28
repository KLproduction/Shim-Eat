import { getOrderFromDB } from "@/data/getOrderFromDB";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Product } from "@prisma/client";
import { getProducts } from "@/data/getProducts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductTablePage = async () => {
  const data: Product[] | undefined = await getProducts();

  return (
    <div className="container mx-auto pb-20 sm:py-10">
      <div className="flex justify-start p-0">
        <Button className="p-3" asChild>
          <Link href={"/admin/products/add-product"}>Add Product</Link>
        </Button>
      </div>
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default ProductTablePage;
