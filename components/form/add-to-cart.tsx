"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAddToCart } from "@/hooks/cart";
import MySpinner from "../ui/MySpinner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { formatPrice } from "@/lib/formatPrice";
import { ADDONSPRICE } from "@/data/products";
import { FormError } from "../form-error";
import { Button } from "../ui/button";
import Link from "next/link";
import { store } from "@/redux/store";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { BsBack } from "react-icons/bs";
import { ArrowBigLeft, ArrowBigLeftDash, ArrowBigLeftIcon } from "lucide-react";

type Props = {
  productId: string;
};
export const AddCartToReduxForm = ({ productId }: Props) => {
  const route = useRouter();
  const {
    data: product,
    isFetching,
    setValue,
    watch,
    getValues,
    reset,
    register,
    errors,
    addOnTotal,
    onSubmit,
    isAddingToCart,
    totalBasePrice,
    addQuantity,
    reduceQuantity,
    registerDrinks,
    onDrinksSubmit,
    addDrinksQuantity,
    reduceDrinksQuantity,
    drinksBasePrice,
    drinksErrors,
    watchDrinks,
    getDrinksValues,
  } = useAddToCart(productId);

  if (isFetching) {
    return <MySpinner />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <MaxWidthWrapper className="flex h-full flex-col items-center justify-center pb-12 sm:pt-16">
        <Card className="m-4 flex max-w-[600px] flex-col items-center justify-end rounded-lg border border-gray-300 bg-white shadow-md">
          <CardHeader className="mb-auto p-6 text-center">
            <CardTitle className="mb-4 text-2xl font-bold text-orange-500">
              {product.name}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {product.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex w-full items-center justify-center p-4">
            <img
              src={product.image || undefined}
              className="h-auto max-w-[250px] rounded-xl object-cover shadow-lg"
            />
          </CardContent>

          {product.category.includes("main") ||
          product.category.includes("salad") ? (
            <form className="w-2/3 space-y-6 p-6" onSubmit={onSubmit}>
              <div className="mx-auto mt-6 flex items-center justify-center gap-10 px-6">
                <Button
                  onClick={reduceQuantity}
                  className="rounded-full"
                  variant={"outline"}
                  type="button"
                  size={"sm"}
                >
                  <BiLeftArrow />
                </Button>
                <Input
                  hidden={true}
                  {...register("quantity")}
                  type="number"
                  onChange={(e) => setValue("quantity", Number(e.target.value))}
                  min={1}
                  className="hidden w-full rounded-md border border-gray-300 p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Label className="p-3 text-xl">{getValues().quantity}</Label>
                <Button
                  onClick={addQuantity}
                  className="rounded-full"
                  variant={"outline"}
                  type="button"
                  size={"sm"}
                >
                  <BiRightArrow />
                </Button>
              </div>
              <div className="my-6">
                <Label className="text-md font-bold text-gray-800">
                  Choose a Size
                </Label>
                <div className="my-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700">{`Standard: +${formatPrice(
                      ADDONSPRICE.size.standard,
                    )}`}</Label>
                    <Input
                      {...register("type")}
                      type="radio"
                      value={"standard"}
                      className="ml-2 h-5 w-5 accent-orange-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700">{`Large: +${formatPrice(
                      ADDONSPRICE.size.large,
                    )}`}</Label>
                    <Input
                      {...register("type")}
                      type="radio"
                      value={"large"}
                      className="ml-2 h-5 w-5 accent-orange-500"
                    />
                  </div>
                </div>
              </div>
              <div className="my-3">
                <Label className="text-md font-bold text-gray-800">
                  Choose a Side
                </Label>
                <div className="my-3 flex flex-col gap-2">
                  {[
                    { label: "Brown Toast", value: "brownToast" },
                    { label: "Potato Salad", value: "potatoSalad" },
                    { label: "Red Rice", value: "redRice" },
                  ].map((side) => (
                    <div
                      key={side.value}
                      className="flex items-center justify-between"
                    >
                      <Label className="text-gray-700">{`${side.label}: +${formatPrice(
                        ADDONSPRICE.addOns[
                          side.value as keyof typeof ADDONSPRICE.addOns
                        ],
                      )}`}</Label>
                      <Input
                        {...register("side")}
                        type="radio"
                        value={side.value}
                        className="ml-2 h-5 w-5 accent-orange-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Input
                {...register("product")}
                type="hidden"
                value={product.id}
              />
              <FormError message={errors.root?.message} />
              <div className="flex w-full items-center justify-end">
                {formatPrice(totalBasePrice)}

                <span>+ ({formatPrice(addOnTotal)})</span>
              </div>
              <Button
                className="flex w-full items-center justify-center gap-3 rounded-md bg-orange-500 py-3 font-medium text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-300"
                type="submit"
              >
                <span>ADD TO CART</span>
                {formatPrice(totalBasePrice + addOnTotal)}
              </Button>
            </form>
          ) : (
            <form
              className="flex flex-col items-center justify-center gap-5"
              onSubmit={onDrinksSubmit}
            >
              <div className="mx-auto mt-6 flex items-center justify-center gap-3 px-6">
                <Button
                  onClick={reduceDrinksQuantity}
                  className="rounded-full"
                  variant={"outline"}
                  type="button"
                  size={"sm"}
                >
                  <BiLeftArrow />
                </Button>
                <Input
                  hidden={true}
                  {...registerDrinks("quantity")}
                  type="number"
                  onChange={(e) => setValue("quantity", Number(e.target.value))}
                  min={1}
                  className="hidden w-full rounded-md border border-gray-300 p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Label className="p-3 text-xl">
                  {getDrinksValues().quantity}
                </Label>
                <Button
                  onClick={addDrinksQuantity}
                  className="rounded-full"
                  variant={"outline"}
                  type="button"
                  size={"sm"}
                >
                  <BiRightArrow />
                </Button>
              </div>

              <div className="hidden">
                <Input
                  {...registerDrinks("type")}
                  type="radio"
                  value={"standard"}
                  hidden
                />
                <Input
                  {...registerDrinks("side")}
                  type="radio"
                  value={"brownToast"}
                  hidden
                />
                <Input
                  {...registerDrinks("product")}
                  type="hidden"
                  value={product.id}
                />
              </div>
              <Button
                className="my-6 flex w-full items-center justify-center gap-3 rounded-md bg-orange-500 py-3 font-medium text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-300"
                type="submit"
              >
                <span>ADD TO CART</span>
                {formatPrice(drinksBasePrice)}
              </Button>
            </form>
          )}
          <div className="w-full">
            <Button
              onClick={() => route.push("/menu")}
              variant={"outline"}
              className="m-6 flex items-center justify-start font-medium"
            >
              <ArrowBigLeftIcon />
              Menu
            </Button>
          </div>
        </Card>
      </MaxWidthWrapper>
    </div>
  );
};
