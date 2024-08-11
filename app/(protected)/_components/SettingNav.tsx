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
import { currentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const SettingNav = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState("order");
  const route = useRouter();
  useEffect(() => {
    setPosition(pathname);
  }, [pathname]);

  const [superAdmin, setSuperAdmin] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    if (pathname.includes("/setting")) {
      setIsSetting(true);
    }
  }, [pathname]);

  useEffect(() => {
    (async () => {
      const user = await currentUser();
      if (user?.isSuperAdmin) {
        setSuperAdmin(true);
      }
    })();
  }, []);

  return (
    <MaxWidthWrapper
      className={cn(
        "flex justify-start p-3 sm:justify-center",
        isSetting ? "hidden" : "",
      )}
    >
      <nav className="hidden w-auto items-center justify-center rounded-xl bg-secondary p-4 shadow-sm sm:flex">
        <div className="hidden gap-2 sm:flex">
          <Button
            asChild
            variant={pathname === "/admin/order" ? "default" : "outline"}
          >
            <Link href="/admin/order">Orders</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin/products" ? "default" : "outline"}
          >
            <Link href="/admin/products">Products</Link>
          </Button>

          <Button
            asChild
            variant={pathname === "/admin/users" ? "default" : "outline"}
          >
            <Link href="/admin/users">Users</Link>
          </Button>

          <Button
            asChild
            variant={pathname === "/admin/superAdmin" ? "default" : "outline"}
            className={!superAdmin ? "hidden" : ""}
          >
            <Link href="/admin/superAdmin">superAdmin</Link>
          </Button>
        </div>
      </nav>

      <div className="flex justify-start sm:hidden">
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
                value="/admin/users"
                onClick={() => route.push("/admin/users")}
              >
                Users
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem
                value="/admin/superAdmin"
                onClick={() => route.push("/admin/superAdmin")}
                className={!superAdmin ? "hidden" : ""}
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
