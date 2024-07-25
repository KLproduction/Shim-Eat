"use client";

import { deleteAlluserOrder } from "@/actions/deleteAlluserOrder";
import { Button } from "@/components/ui/button";
import { generateDummyUserOrderToDB } from "@/data/generateDummyUserOrderToDB";
import { generateDummyUserToDB } from "@/data/generateDummyUserToDB";
import { createProducts, deleProducts } from "@/data/products";
import { startTransition, useTransition } from "react";
import { toast } from "sonner";

const superAdminPage = () => {
  const [pending, startTransition] = useTransition();
  const generateDummyOrder = () => {
    startTransition(async () => {
      await generateDummyUserOrderToDB().then((data) => {
        if (data?.message) {
          toast.success(data.message);
        }
      });
    });
  };
  const createProudct = () => {
    startTransition(async () => {
      await createProducts().then((data) => {
        if (data?.message) {
          toast.success(data.message);
        }
      });
    });
  };
  const deleteProudct = () => {
    startTransition(async () => {
      await deleProducts().then((data) => {
        if (data?.message) {
          toast.success(data.message);
        }
      });
    });
  };
  const deleteUserOrder = () => {
    startTransition(async () => {
      await deleteAlluserOrder().then((data) => {
        if (data?.message) {
          toast.success(data.message);
        }
      });
    });
  };
  const createUser = () => {
    startTransition(async () => {
      await generateDummyUserToDB().then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        toast.success(data.success);
      });
    });
  };
  return (
    <main className="flex flex-col justify-center gap-3">
      <Button onClick={() => generateDummyOrder()} disabled={pending}>
        Create Dummy Order
      </Button>
      <Button onClick={() => createProudct()} disabled={pending}>
        Re-generate Product List
      </Button>
      <Button onClick={() => createUser()} disabled={pending}>
        Create Dummy User
      </Button>
      <div className=" border-b-2 border-zinc-600" />
      <Button
        variant={"destructive"}
        onClick={() => deleteProudct()}
        disabled={pending}
      >
        Delete All Proudcts
      </Button>
      <Button
        variant={"destructive"}
        onClick={() => deleteUserOrder()}
        disabled={pending}
      >
        Delete All UserOrder
      </Button>
    </main>
  );
};

export default superAdminPage;
