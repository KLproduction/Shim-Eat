import { AddCartToReduxForm } from "@/components/form/add-to-cart";
import { currentUser } from "@/lib/auth";
import React from "react";

type Props = {
  params: {
    productId: string;
  };
};

const Page = async ({ params }: Props) => {
  const user = await currentUser();
  return (
    <div>
      <AddCartToReduxForm productId={params.productId} userId={user?.id} />
    </div>
  );
};

export default Page;
