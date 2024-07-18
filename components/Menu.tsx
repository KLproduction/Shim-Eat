import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

const Menu = async () => {
  const products = await db.product.findMany();

  const saladMenu = products.filter((product) => product.category === "salad");
  const mainMenu = products.filter((product) => product.category === "main");
  const drinkMenu = products.filter((product) => product.category === "drinks");

  return (
    <>
      <MaxWidthWrapper>
        <div className=" flex items-center justify-center">
          <h1 className="text-5xl font-bold text-green-500 my-5">
            {saladMenu[0].category.toUpperCase()}
          </h1>
        </div>
        <div className="grid sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {saladMenu.map((product) => (
            <Card
              key={product.name}
              className="flex flex-col items-center justify-end m-4 duration-500"
            >
              <CardHeader className="mb-auto">
                <CardTitle className="text-orange-500">
                  {product.name}
                </CardTitle>
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
                    className=" flex gap-5"
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
        <div className=" flex items-center justify-center">
          <h1 className="text-5xl font-bold text-green-500 my-5">
            {mainMenu[0].category.toUpperCase()}
          </h1>
        </div>
        <div className=" sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {mainMenu.map((product) => (
            <Card
              key={product.name}
              className="flex flex-col items-center justify-end m-4 duration-500"
            >
              <CardHeader className="mb-auto">
                <CardTitle className="text-orange-500">
                  {product.name}
                </CardTitle>
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
                    className=" flex gap-5"
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
        <div className=" flex items-center justify-center">
          <h1 className="text-5xl font-bold text-green-500 my-5">
            {drinkMenu[0].category.toUpperCase()}
          </h1>
        </div>
        <div className=" sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {drinkMenu.map((product) => (
            <Card
              key={product.name}
              className="flex flex-col items-center justify-end m-4 duration-500"
            >
              <CardHeader className="mb-auto">
                <CardTitle className="text-orange-500">
                  {product.name}
                </CardTitle>
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
                    className=" flex gap-5"
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
      </MaxWidthWrapper>
    </>
  );
};

export default Menu;
