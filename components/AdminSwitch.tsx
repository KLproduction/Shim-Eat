"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const AdminSwitch = () => {
  const [isAdmin, setAdmin] = useState(false);
  const pathName = usePathname();
  const adminPath = ["/admin", "/admin/products", "/admin/product-details"];
  useEffect(() => {
    if (adminPath.some((path) => pathName.includes(path))) {
      setAdmin(true);
    }
  }, [pathName]);

  return (
    <div
      className={cn(
        "z-0 flex h-[40px] items-center justify-start gap-3 bg-orange-400 p-3",
        { "opacity-80": isAdmin, "bg-transparent opacity-50": !isAdmin },
      )}
    >
      {" "}
      <div className="flex items-center justify-start gap-3 p-3">
        <Switch id="admin-mode" checked={isAdmin} onCheckedChange={setAdmin} />
        <Label
          htmlFor="admin-mode"
          className={cn(isAdmin ? "text-zinc-50" : "text-zinc-500")}
        >
          Admin Mode
        </Label>
      </div>
      {isAdmin && (
        <Button
          asChild
          variant={"outline"}
          size={"sm"}
          className="bg-green-500 p-3"
        >
          <Link href={"/admin/order"} className="text-zinc-50">
            Admin
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AdminSwitch;
