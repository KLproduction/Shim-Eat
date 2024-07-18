// ProductCategoryMenu.js
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { Product, ProductCategory } from "@prisma/client";

type TProductCategoryMenu = {
  menuItems: Product[] | null;
  categoryName: ProductCategory;
};

const ProductCategoryMenu = ({
  menuItems,
  categoryName,
}: TProductCategoryMenu) => {
  return (
    <>
      <div className="flex items-center justify-start ml-8">
        <h1 className="text-5xl font-bold text-green-500 my-5">
          {categoryName.toUpperCase()}
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {menuItems?.map((product) => (
          <Card
            key={product.name}
            className="flex flex-col items-center justify-end m-4 duration-500"
          >
            <CardHeader className="mb-auto">
              <CardTitle className="text-orange-500">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={product.image || undefined}
                className="max-w-[250px] h-auto object-cover rounded-xl flex-grow"
              />
            </CardContent>
            <CardFooter>
              <Button asChild className="hover:scale-110 duration-500">
                <Link
                  href={`http://localhost:3000/product?product=${product.id}`}
                  className="flex gap-5"
                >
                  <div className="flex gap-3">
                    <h1>Order</h1>
                    <h2>{formatPrice(product.price)}</h2>
                  </div>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductCategoryMenu;
