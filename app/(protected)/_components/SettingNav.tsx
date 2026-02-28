"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  LayoutDashboard,
  Menu,
  Package2,
  ShieldEllipsis,
  ShoppingBag,
  Users,
} from "lucide-react";
import { currentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const SettingNav = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState("/admin");
  const route = useRouter();
  useEffect(() => {
    setPosition(pathname);
  }, [pathname]);

  const [superAdmin, setSuperAdmin] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    if (pathname.includes("/setting")) {
      setIsSetting(true);
    } else {
      setIsSetting(false);
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
        "sticky top-0 z-30 flex justify-start px-4 pt-24 sm:justify-center",
        isSetting ? "hidden" : "",
      )}
    >
      <nav className="hidden w-full max-w-6xl items-center justify-center rounded-[24px] border border-white/70 bg-white/80 p-3 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.45)] backdrop-blur sm:flex">
        <div className="grid w-full grid-cols-5 gap-2">
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "ghost"}
            className={cn(
              "h-11 rounded-2xl",
              pathname === "/admin"
                ? "bg-slate-950 text-white hover:bg-slate-950/90"
                : "text-slate-600 hover:bg-slate-100",
            )}
          >
            <Link href="/admin" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin/order" ? "default" : "ghost"}
            className={cn(
              "h-11 rounded-2xl",
              pathname === "/admin/order"
                ? "bg-slate-950 text-white hover:bg-slate-950/90"
                : "text-slate-600 hover:bg-slate-100",
            )}
          >
            <Link href="/admin/order" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin/products" ? "default" : "ghost"}
            className={cn(
              "h-11 rounded-2xl",
              pathname === "/admin/products"
                ? "bg-slate-950 text-white hover:bg-slate-950/90"
                : "text-slate-600 hover:bg-slate-100",
            )}
          >
            <Link href="/admin/products" className="gap-2">
              <Package2 className="h-4 w-4" />
              Products
            </Link>
          </Button>

          <Button
            asChild
            variant={pathname === "/admin/users" ? "default" : "ghost"}
            className={cn(
              "h-11 rounded-2xl",
              pathname === "/admin/users"
                ? "bg-slate-950 text-white hover:bg-slate-950/90"
                : "text-slate-600 hover:bg-slate-100",
            )}
          >
            <Link href="/admin/users" className="gap-2">
              <Users className="h-4 w-4" />
              Users
            </Link>
          </Button>

          <Button
            asChild
            variant={pathname === "/admin/superAdmin" ? "default" : "ghost"}
            className={cn(
              "h-11 rounded-2xl",
              pathname === "/admin/superAdmin"
                ? "bg-slate-950 text-white hover:bg-slate-950/90"
                : "text-slate-600 hover:bg-slate-100",
              !superAdmin ? "hidden" : "",
            )}
          >
            <Link href="/admin/superAdmin" className="gap-2">
              <ShieldEllipsis className="h-4 w-4" />
              Super Admin
            </Link>
          </Button>
        </div>
      </nav>

      <div className="flex justify-start sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              className="rounded-2xl border-white/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur"
              asChild
            >
              <div className="flex items-center gap-3">
                Admin
                <Menu className="h-4 w-4" />
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
                value="/admin"
                onClick={() => route.push("/admin")}
              >
                Dashboard
              </DropdownMenuRadioItem>
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
                Super Admin
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </MaxWidthWrapper>
  );
};

export default SettingNav;
