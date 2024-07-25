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
import { ChangeDeliveryStatusSchema, ChangeOrderStatusSchema } from "@/schemas";
import { DeliveryStatus } from "@prisma/client";
import { TUserOrder } from "@/lib/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { startTransition, useEffect, useState } from "react";
import { getOrderByOrderID } from "@/data/getOrderByOrderID";
import { changeOrderStatus } from "@/actions/changeOrderStatus";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ChangeStatusFormProps {
  orderId: string;
}

const ChangeOrderStatusForm = ({ orderId }: ChangeStatusFormProps) => {
  const [order, setOrder] = useState<TUserOrder | null>(null);
  const route = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getOrderByOrderID(orderId);
      if (orderId) {
        setOrder(fetchedProduct!);
      }
    };

    fetchProduct();
  }, [orderId]);

  const form = useForm<z.infer<typeof ChangeOrderStatusSchema>>({
    resolver: zodResolver(ChangeOrderStatusSchema),
    defaultValues: {
      status: order?.status || undefined,
      orderId: order?.id || undefined,
    },
  });

  useEffect(() => {
    if (order) {
      form.reset({
        status: order.status,
        orderId: order.id,
      });
    }
  }, [order, form]);

  const onSubmit = (values: z.infer<typeof ChangeOrderStatusSchema>) => {
    console.log("Submitting form", values);
    try {
      startTransition(async () => {
        if (values.orderId) {
          await changeOrderStatus(values).then((data) => {
            if (data.error) {
              toast.error(data.error);
            }
            toast.success(data.success);
            route.refresh();
          });
        }
      });
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="flex justify-start">
      <div></div>
      <Form {...form}>
        <form
          className="flex items-center flex-col justify-center gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Status:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={order?.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="PAID">Paid</SelectItem>
                        <SelectItem value="COMPLETE">Complete</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
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
            name="orderId"
            render={({ field }) => (
              <FormItem hidden>
                <FormControl>
                  <Input {...field} defaultValue={order?.id} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button size={"sm"}>Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangeOrderStatusForm;
