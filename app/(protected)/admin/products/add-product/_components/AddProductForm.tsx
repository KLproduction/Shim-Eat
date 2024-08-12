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
import { Product } from "@prisma/client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";
import { ProductAddingSchema, ProductsettingSchema } from "@/schemas";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { checkServerSession } from "@/actions/check-server-session";
import { addProductToDB } from "@/actions/addProductToDB";
import UploadImage from "./UploadImage";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { TaddCartToDB } from "@/lib/type";
import { Weight } from "lucide-react";
import Link from "next/link";

const AddProductForm = () => {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [imageURL, setImageURL] = useState("");
  const route = useRouter();

  const form = useForm<z.infer<typeof ProductAddingSchema>>({
    resolver: zodResolver(ProductAddingSchema),
    defaultValues: {
      name: undefined,
      category: undefined,
      description: undefined,
      price: undefined,
      image: undefined,
      status: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ProductAddingSchema>) => {
    try {
      startTransition(async () => {
        setSuccess("");
        setError("");
        if (values) {
          const data = await addProductToDB(values);
          if (data?.success === true) {
            toast.success(data.message);
            route.push("/admin/products");
          }

          if (data?.success !== true) {
            const errorMessage =
              data?.message ?? "An unexpected error occurred.";
            setError(errorMessage);
          }
        }
      });
    } catch (error) {
      setError("Failed to create product.");
      console.error("Update error:", error);
    }
    console.log(form.getValues());
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-[300px] sm:w-[600px]">
        <CardHeader>Add Product</CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                          placeholder={"Enter product name"}
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
                            <SelectValue placeholder={"Category"} />
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
                              parseFloat(parseFloat(e.target.value).toFixed(2)),
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
                            <SelectValue placeholder={"Status"} />
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
              {!imageURL ? (
                <div>
                  <Label>Upload Product Image:</Label>
                  <UploadDropzone
                    className="cursor-pointer"
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
                      console.log("Files: ", res);
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
                <div className="flex justify-center">
                  <img src={imageURL} alt="" />
                </div>
              )}
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className="flex justify-center">
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
    </div>
  );
};

export default AddProductForm;
