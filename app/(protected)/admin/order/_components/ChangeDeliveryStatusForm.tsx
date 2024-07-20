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
import { ChangeDeliveryStatusSchema } from "@/schemas";
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
import { changeDeliveryStatus } from "@/actions/changeDeliveryStatus";
import { startTransition, useEffect, useState } from "react";
import { getOrderByOrderID } from "@/data/getOrderByOrderID";

interface ChangeDeliveryStatusFormProps {
  orderId: string;
}

const ChangeDeliveryStatusForm = ({
  orderId,
}: ChangeDeliveryStatusFormProps) => {
  const [order, setOrder] = useState<TUserOrder | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getOrderByOrderID(orderId);
      if (orderId) {
        setOrder(fetchedProduct!);
      }
    };

    fetchProduct();
  }, [orderId]);
  const form = useForm<z.infer<typeof ChangeDeliveryStatusSchema>>({
    resolver: zodResolver(ChangeDeliveryStatusSchema),
    defaultValues: {
      deliveryStatus: order?.deliveryStatus,
    },
  });
  const onSubmit = (values: z.infer<typeof ChangeDeliveryStatusSchema>) => {
    try {
      startTransition(async () => {
        if (values.orderId) {
          await changeDeliveryStatus(values);
        }
      });
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className=" space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="deliveryStatus"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={order?.deliveryStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="DISPATCHED">Dispatched</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={order?.id} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ChangeDeliveryStatusForm;
