import CartItemCards from "@/components/ShowUserCartFormStoage";
import React from "react";

type Props = {
  params: {
    cartId: string;
  };
};

const page = ({ params }: Props) => {
  return (
    <div>
      <CartItemCards cartId={params.cartId} />
    </div>
  );
};

export default page;
