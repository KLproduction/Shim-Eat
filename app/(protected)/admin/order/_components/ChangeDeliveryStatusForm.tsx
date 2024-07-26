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
import { startTransition, useEffect, useState, useTransition } from "react";
import { getOrderByOrderID } from "@/data/getOrderByOrderID";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ChangeDeliveryStatusFormProps {
  orderId: string;
}

const ChangeDeliveryStatusForm = ({
  orderId,
}: ChangeDeliveryStatusFormProps) => {
  const [order, setOrder] = useState<TUserOrder | null>(null);
  const [pending, startTransition] = useTransition();
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
  const form = useForm<z.infer<typeof ChangeDeliveryStatusSchema>>({
    resolver: zodResolver(ChangeDeliveryStatusSchema),
    defaultValues: {
      deliveryStatus: order?.deliveryStatus || undefined,
      orderId: order?.id || undefined,
    },
  });

  useEffect(() => {
    if (order) {
      form.reset({
        deliveryStatus: order.deliveryStatus,
        orderId: order.id,
      });
    }
  }, [order, form]);

  const onSubmit = (values: z.infer<typeof ChangeDeliveryStatusSchema>) => {
    try {
      startTransition(async () => {
        if (values.orderId) {
          await changeDeliveryStatus(values).then((data) => {
            if (data.error) {
              toast.error(data.error);
            }
            toast.success(data.success);
          });
        }
      });
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="flex justify-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center gap-3">
            <FormField
              control={form.control}
              name="deliveryStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Status:</FormLabel>
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
                  <FormControl>
                    <Input {...field} defaultValue={order?.id} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={"sm"} disabled={pending}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangeDeliveryStatusForm;
