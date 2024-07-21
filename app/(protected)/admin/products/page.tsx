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
import { checkServerSession } from "@/actions/check-server-session";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[] | null>();
  useEffect(() => {
    (async () => {
      await checkServerSession();
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  return (
    <>
      <MaxWidthWrapper>
        <Card>
          <div className="p-3 flex justify-end">
            <Button className="p-3" asChild>
              <Link href={"/admin/products/add-product"}>Add Product</Link>
            </Button>
          </div>

          <Table className="p-3 max-w-[300px] sm:max-w-full text-xs sm:text-md mx-auto">
            <TableCaption>A list of existing products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:block"></TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className=""></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id} className=" bg-zinc-50 ">
                  <TableCell className="hidden sm:block mt-3">
                    <img
                      src={product.image || undefined}
                      alt="proudct image"
                      className=" max-w-[80px] rounded-full"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    <Button asChild variant={"link"}>
                      <Link
                        href={`/admin/products/product-details?product=${product.id}`}
                      >
                        Config
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

export default AdminProductsPage;
