import { AddCartToReduxForm } from "@/components/form/add-to-cart";
import { currentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  params: {
    productId: string;
  };
};

const page = async ({ params }: Props) => {
  const user = await currentUser();
  const cookieStore = cookies();
  const cookieRedirect = cookieStore.get("postLoginRedirect")?.value;
  if (cookieRedirect) {
    cookieStore.delete("postLoginRedirect");
  }
  return (
    <div>
      <AddCartToReduxForm productId={params.productId} userId={user?.id} />
    </div>
  );
};

export default page;
