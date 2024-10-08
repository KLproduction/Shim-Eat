import React from "react";
import NavbarMobileComponents from "./_components/NavbarMobile_compoent";
import { currentUser } from "@/lib/auth";
import { getCartIdbyUserId } from "@/data/getCartIdbyUserId";
import { ExtenderUser } from "@/next-auth";

const NavbarMobileNew = async () => {
  const user = await currentUser();

  return (
    <div>
      <NavbarMobileComponents user={user!} />
    </div>
  );
};

export default NavbarMobileNew;
