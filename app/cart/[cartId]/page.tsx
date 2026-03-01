import CartItemCards from "@/components/ShowUserCartFormStoage";
import React from "react";

type Props = {
  params: Promise<{
    cartId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { cartId } = await params;

  return (
    <div>
      <CartItemCards cartId={cartId} />
    </div>
  );
};

export default page;
