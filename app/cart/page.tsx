import ShowUserCartFromDB from "@/components/ShowUserCartFormDB";
import ShowUserCartFromDBTest from "@/components/ShowUserCartFormDBTest";
import { currentUser } from "@/lib/auth";

import React from "react";

const CartPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <ShowUserCartFromDB user={user!} />
      {/* <ShowUserCartFromDBTest /> */}
    </div>
  );
};

export default CartPage;
