import { AddCartToReduxForm } from "@/components/form/add-to-cart";
import { currentUser } from "@/lib/auth";
import React from "react";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const user = await currentUser();
  const { productId } = await params;

  return (
    <div>
      <AddCartToReduxForm productId={productId} userId={user?.id} />
    </div>
  );
};

export default Page;
