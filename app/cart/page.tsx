import ShowUserCartFromDB from "@/components/ShowUserCartFormDB";
import ShowUserCartFromDBTest from "@/components/ShowUserCartFormDBTest";
import { currentUser } from "@/lib/auth";

import React from "react";

const CartPage = async () => {
  const user = await currentUser();
  return (
    <div className="pb-12 sm:pb-0">
      <ShowUserCartFromDB user={user!} />
    </div>
  );
};

export default CartPage;
