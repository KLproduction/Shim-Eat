"use client";

import { AddCartToReduxForm } from "@/components/form/add-to-cart";
import React from "react";

type Props = {
  params: {
    productId: string;
  };
};

const page = ({ params }: Props) => {
  return (
    <div>
      <AddCartToReduxForm productId={params.productId} />
    </div>
  );
};

export default page;
