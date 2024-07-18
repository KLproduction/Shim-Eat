"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductById } from "@/data/getProductById";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { toast } from "sonner";
import { formatPrice } from "@/lib/formatPrice";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddOnsSchema } from "@/schemas";
import { ADDONSPRICE } from "@/data/products";
import MySpinner from "@/components/ui/MySpinner";
import { Product } from "@prisma/client";
import addToCartDB from "@/actions/addToCartDB";
import { TaddCartToDB } from "@/lib/type";

const ProductPage = () => {
  const [Pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [addOnTotal, setAddOnTotal] = useState(0);

  const form = useForm<z.infer<typeof AddOnsSchema>>({
    resolver: zodResolver(AddOnsSchema),
    defaultValues: {
      type: "standard",
      side: "brownToast",
    },
  });
  const form2 = useForm<z.infer<typeof AddOnsSchema>>({
    resolver: zodResolver(AddOnsSchema),
    defaultValues: {
      type: "standard",
      side: "noAddOns",
    },
  });

  useEffect(() => {
    const productId = searchParams.get("product");

    const fetchProduct = async () => {
      if (productId) {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      } else {
        setError("Invaild product ID!");
        return;
      }
    };

    fetchProduct();
  }, [searchParams]);

  if (!product) {
    return <MySpinner />;
  }

  const onClickHandler = (extraPrice: number) => {
    startTransition(() => {
      setError("");
      setSuccess("");

      const sizeOption = form.getValues().type;
      const sideOption = form.getValues().side;
      const formData: TaddCartToDB = {
        product,
        quantity: 1,
        sizeOption,
        sideOption,
        extraPrice,
      };
      addToCartDB([formData]).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success);
        }
      });
    });
  };
  const drinksOnClickHandler = (extraPrice: number) => {
    startTransition(() => {
      setError("");
      setSuccess("");

      const sizeOption = form2.getValues().type;
      const sideOption = form2.getValues().side;
      const formData: TaddCartToDB = {
        product,
        quantity: 1,
        sizeOption,
        sideOption,
        extraPrice,
      };
      addToCartDB([formData]).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success);
        }
      });
    });
  };

  const updateAddOnTotal = () => {
    const type = form.getValues().type;
    const side = form.getValues().side;
    const typePrice = ADDONSPRICE.size[type as keyof typeof ADDONSPRICE.size];
    const sidePrice =
      ADDONSPRICE.addOns[side as keyof typeof ADDONSPRICE.addOns];
    const total = typePrice + sidePrice;
    setAddOnTotal(total);
  };

  return (
    <div>
      <MaxWidthWrapper className="flex flex-col items-center justify-center h-full pt-44">
        <Card className="flex flex-col items-center justify-end m-4 max-w-[600px]">
          <CardHeader className="mb-auto">
            <CardTitle className="text-orange-500">{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-around">
            <img
              src={product.image || undefined}
              className="max-w-[250px] h-auto object-cover rounded-xl flex-grow"
            />
          </CardContent>
          {product.category.includes("salad") ||
          product.category.includes("main") ? (
            <Form {...form}>
              <form className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Choice the Size</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            updateAddOnTotal();
                          }}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="standard" />
                            </FormControl>
                            <FormLabel className="font-normal flex gap-3">
                              Standard:
                              {formatPrice(ADDONSPRICE.size.standard)}
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="large" />
                            </FormControl>
                            <FormLabel className="font-normal flex gap-3">
                              Large :{formatPrice(ADDONSPRICE.size.large)}
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="side"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Choice your Side</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            updateAddOnTotal();
                          }}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="brownToast" />
                            </FormControl>
                            <FormLabel className="font-normal flex gap-3">
                              Brown Toast:
                              {formatPrice(ADDONSPRICE.addOns.brownToast)}
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="redRice" />
                            </FormControl>
                            <FormLabel className="font-normal flex gap-3">
                              Red Rice :
                              {formatPrice(ADDONSPRICE.addOns.redRice)}
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="potatoSalad" />
                            </FormControl>
                            <FormLabel className="font-normal flex gap-3">
                              Potato Salad :
                              {formatPrice(ADDONSPRICE.addOns.potatoSalad)}
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <Form {...form2}>
              <form className="w-2/3 space-y-6" hidden>
                <FormField
                  control={form2.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            updateAddOnTotal();
                          }}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="standard" />
                            </FormControl>
                            <FormLabel className="font-normal flex gap-3">
                              Standard:
                              {formatPrice(ADDONSPRICE.size.standard)}
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form2.control}
                  name="side"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            updateAddOnTotal();
                          }}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="noAddOns" />
                            </FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          <CardFooter className="flex flex-col mt-5 gap-2">
            <FormError message={error} />
            <FormSuccess message={success} />
            {product.category.includes("salad") ||
            product.category.includes("main") ? (
              <Button
                className="flex gap-5"
                onClick={() => onClickHandler(addOnTotal)}
              >
                <h1>ADD TO CART</h1>
                {formatPrice(product.price)}
                {(form.getValues().type !== "standard" ||
                  form.getValues().side !== "brownToast") && (
                  <h1>+ ({formatPrice(addOnTotal)})</h1>
                )}
              </Button>
            ) : (
              <Button
                className="flex gap-5"
                onClick={() => drinksOnClickHandler(addOnTotal)}
              >
                <h1>ADD TO CART</h1>
                {formatPrice(product.price)}
                {(form.getValues().type !== "standard" ||
                  form.getValues().side !== "brownToast") && (
                  <h1>+ ({formatPrice(addOnTotal)})</h1>
                )}
              </Button>
            )}
            <Button asChild variant={"ghost"} size={"sm"} disabled={Pending}>
              <Link href={"/menu"}>Back To Menu</Link>
            </Button>
          </CardFooter>
        </Card>
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductPage;
