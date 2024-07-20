"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserBtn } from "@/components/auth/UserBtn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const SettingNav = () => {
  const pathname = usePathname();
  return (
    <MaxWidthWrapper>
      <nav className=" bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
        <div className=" sm:flex gap-2 hidden">
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
          <UserBtn />
        </div>

        <div className="sm:hidden max-w-[200px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={pathname} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ADMIN">
                  <Button asChild>
                    <Link href="/admin">Admin</Link>
                  </Button>
                </SelectItem>
                <SelectItem value="PRODUCTS">
                  <Button asChild>
                    <Link href="/admin/products">Products</Link>
                  </Button>
                </SelectItem>
                <SelectItem value="ORDER">
                  <Button asChild>
                    <Link href="/admin/order">Order</Link>
                  </Button>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default SettingNav;
