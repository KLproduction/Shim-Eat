"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserBtn } from "@/components/auth/UserBtn";

const SettingNav = () => {
  const pathname = usePathname();
  return (
    <nav className=" bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className=" flex gap-2">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/setting" ? "default" : "outline"}
        >
          <Link href="/setting">Setting</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin/product" ? "default" : "outline"}
        >
          <Link href="/admin/products">Products</Link>
        </Button>
      </div>
      <UserBtn />
    </nav>
  );
};

export default SettingNav;
