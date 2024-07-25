"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { UserBtn } from "@/components/auth/UserBtn";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { AiOutlineMenu } from "react-icons/ai";

const SettingNav = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState("order");
  const route = useRouter();
  useEffect(() => {
    setPosition(pathname);
  }, [pathname]);

  return (
    <MaxWidthWrapper className=" flex sm:justify-center justify-start p-3">
      <nav className=" bg-secondary hidden sm:flex justify-center items-center p-4 rounded-xl w-auto shadow-sm">
        <div className=" sm:flex gap-2 hidden">
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
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
            variant={pathname === "/admin/products" ? "default" : "outline"}
          >
            <Link href="/admin/products">Products</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin/order" ? "default" : "outline"}
          >
            <Link href="/admin/order">Order</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin/superAdmin" ? "default" : "outline"}
          >
            <Link href="/admin/superAdmin">superAdmin</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin//table" ? "default" : "outline"}
          >
            <Link href="/admin/table">table</Link>
          </Button>
        </div>
      </nav>

      <div className="sm:hidden flex justify-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} asChild>
              <div className="flex items-center gap-3">
                Admin
                <AiOutlineMenu />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Admin Page</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem
                value="/admin/order"
                onClick={() => route.push("/admin/order")}
              >
                Orders
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem
                value="/admin/products"
                onClick={() => route.push("/admin/products")}
              >
                Products
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="/admin/products"
                onClick={() => route.push("/admin/superAdmin")}
              >
                superAdmin
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </MaxWidthWrapper>
  );
};

export default SettingNav;
