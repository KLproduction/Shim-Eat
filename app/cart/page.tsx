import ShowUserCartFromDB from "@/components/ShowUserCartFormDB";
import ShowUserCartFromStoage from "@/components/ShowUserCartFormStoage";
import { currentUser } from "@/lib/auth";

import React from "react";

const CartPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <ShowUserCartFromDB user={user!} />
    </div>
  );
};

export default CartPage;
