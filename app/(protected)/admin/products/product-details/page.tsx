"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MySpinner from "@/components/ui/MySpinner";
import { getProductById } from "@/data/getProductById";
import { Product } from "@prisma/client";
import { redirect, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";
import { ProductsettingSchema } from "@/schemas";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productSetting } from "@/actions/productSetting";
import { Textarea } from "@/components/ui/textarea";
import { deleteProductData } from "@/actions/deleteProductData";
import { toast } from "sonner";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ProductDetailsPage = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [formLoaded, setFormLoaded] = useState(false);
  const productId = searchParams.get("product");

  useEffect(() => {
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

  const form = useForm<z.infer<typeof ProductsettingSchema>>({
    resolver: zodResolver(ProductsettingSchema),
    defaultValues: {
      name: product?.name,
      category: product?.category,
      description: product?.description,
      price: product?.price,
      image: product?.image || undefined,
      status: product?.status,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image || undefined,
      });
      setFormLoaded(true);
    }
  }, [product, form]);

  const onSubmit = (values: z.infer<typeof ProductsettingSchema>) => {
    if (!productId) {
      console.log("No product ID found");
      return;
    }
    try {
      startTransition(async () => {
        setSuccess("");
        setError("");
        if (productId) {
          const response = await productSetting(productId, values);
          if (response?.success) {
            setSuccess("Update successful!");
          } else {
            setError("Update failed");
          }
        }
      });
    } catch (error) {
      setError("Failed to update product settings.");
      console.error("Update error:", error);
    }
  };

  const deleteHandler = (productId: string) => {
    startTransition(async () => {
      setSuccess("");
      setError("");
      if (productId) {
        await deleteProductData(productId).then((data) => {
          if (data.success) {
            setSuccess(data.success);
            toast.success(data.success);
            redirect("/admin/products");
          }
          if (data.error) {
            setError(data.error);
            toast.error(data.error);
          }
        });
      }
    });
  };

  if (!formLoaded) return <MySpinner />;
  if (!product) {
    return <MySpinner />;
  }

  return (
    <Card className=" sm:w-[600px] w-[300px]">
      <CardHeader>Setting</CardHeader>
      <CardContent>
        <Form {...form}>
          <form className=" space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={product.name}
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={product.category} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="salad">salad</SelectItem>
                            <SelectItem value="main">main</SelectItem>
                            <SelectItem value="drinks">drinks</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        disabled={pending}
                        onChange={(e) =>
                          field.onChange(
                            parseFloat(parseFloat(e.target.value).toFixed(2))
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={pending} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={product.status} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="onSale">ON Sale</SelectItem>
                            <SelectItem value="notAvailable">
                              Not Available
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className=" flex justify-center">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
        <Dialog>
          <DialogTrigger asChild className="flex justify-end">
            <div>
              <Button variant={"destructive"}>Delete</Button>
            </div>
          </DialogTrigger>
          <DialogContent className="p-0 w-auto h-[150px] bg-white bg-transparent border-none shadow-lg">
            <Card>
              <DialogHeader>
                <DialogTitle>
                  <div className="p-5 mt-6 flex items-center justify-center gap-3 text-red-700 border-red-700">
                    <ExclamationTriangleIcon />
                    Warning: Deleted Product Data is Unrecoverable
                  </div>
                </DialogTitle>
              </DialogHeader>
              <DialogTrigger asChild>
                <div className="flex items-center justify-center gap-5 my-auto">
                  <Button variant={"outline"}>Cancel</Button>
                  <Button
                    onClick={() => deleteHandler(productId!)}
                    variant={"destructive"}
                    disabled={pending}
                    className="p-2"
                  >
                    Delete Product
                  </Button>
                </div>
              </DialogTrigger>
            </Card>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsPage;
