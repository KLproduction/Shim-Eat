"use client";

import { currentUser } from "@/lib/auth";
import { startTransition, useEffect, useState } from "react";
import { getCartItembyId } from "@/data/getCartItembyId";
import { userCart } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { addCartToOrder } from "@/actions/addCartToOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddCartitemToOrderBtn = () => {
  const [data, setData] = useState<userCart | null>();
  const route = useRouter();

  useEffect(() => {
    (async () => {
      const user = await currentUser();
      if (!user) return <h1>Loading...</h1>;
      const data = await getCartItembyId(user.id!);
      setData(data);
    })();
  }, []);

  const onClickhandler = async () => {
    if (data) {
      startTransition(async () => {
        await addCartToOrder([data]).then((data) => {
          if (data?.error) {
            toast.error(data.error);
            console.log(data.error);
          }
          if (data?.success) {
            console.log(data.success);
            console.log(data.orderId);
            route.push("/checkout");
          }
        });
      });
    }
  };

  return (
    <Button
      onClick={() => {
        onClickhandler();
      }}
    >
      BUY NOW
    </Button>
  );
};

export default AddCartitemToOrderBtn;
