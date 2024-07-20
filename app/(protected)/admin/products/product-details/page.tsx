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
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { checkServerSession } from "@/actions/check-server-session";
import { UploadDropzone } from "@/lib/uploadthing";
import Link from "next/link";

const ProductDetailsPage = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [formLoaded, setFormLoaded] = useState(false);
  const productId = searchParams.get("product");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      await checkServerSession();
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

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image || undefined,
        status: product?.status,
      });
      setFormLoaded(true);
    }
  }, [product]);

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
            toast.success(response.success);
            redirect("/admin/products");
          } else {
            setError("Update failed");
            toast.error(response?.error);
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
    <Card className=" sm:w-[600px] w-[300px] text-zinc-600">
      <div className=" flex justify-end p-5">
        <Dialog>
          <DialogTrigger asChild className="flex justify-start">
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
      </div>
      <CardHeader className="text-xl font-bold">Setting</CardHeader>
      <img
        src={product.image || undefined}
        className=" relative rounded-full max-h-[150px] ml-5 my-3"
      />
      <CardContent>
        <div className="flex justify-end">
          <Label className="">Product ID: {product.id}</Label>
        </div>
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
                            <SelectItem value="onSale">On Sale</SelectItem>
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
              {!imageURL ? (
                <div>
                  <div>
                    <Label>Change Product Image (optional)</Label>
                    <UploadDropzone
                      className=" cursor-pointer"
                      appearance={{
                        uploadIcon: {
                          color: "orange",
                        },
                        button: {
                          background: "orange",
                        },
                        label: {
                          color: "green",
                        },
                      }}
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setImageURL(res[0].url);
                        form.setValue("image", res[0].url, {
                          shouldValidate: true,
                        });
                        toast.success("Upload Completed");
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ImageURL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={"Image"}
                            disabled={true}
                            value={imageURL}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <img src={imageURL} alt="" />
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />

            <div className=" flex justify-center">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant={"outline"}>
          <Link href={"/admin/products"}>Back</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductDetailsPage;
