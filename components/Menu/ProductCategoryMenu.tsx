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
      <div className="ml-8 flex items-center justify-start">
        <h1 className="my-5 text-5xl font-bold text-green-500">
          {categoryName.toUpperCase()}
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {menuItems?.map((product) => (
          <Card
            key={product.name}
            className="m-4 flex flex-col items-center justify-end duration-500"
          >
            <CardHeader className="mb-auto">
              <CardTitle className="mb-10 text-orange-500">
                {product.name}
              </CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={product.image || undefined}
                className="h-auto max-w-[250px] flex-grow rounded-xl object-cover"
              />
            </CardContent>
            <CardFooter>
              <Button asChild className="duration-500 hover:scale-110">
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
