"use client";

import { getProducts } from "@/data/getProducts";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[] | null>();
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] hidden sm:block">
            Product ID
          </TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <>
            <TableRow
              key={product.id}
              className=" items-center justify-center bg-zinc-50"
            >
              <TableCell className="font-medium hidden sm:block">
                {product.id}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>
              <TableCell>{product.status}</TableCell>
              <Button asChild variant={"link"}>
                <Link
                  href={`/admin/products/product-details?product=${product.id}`}
                  className="flex justify-center"
                >
                  Config
                </Link>
              </Button>
            </TableRow>
          </>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default AdminProductsPage;
