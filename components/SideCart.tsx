"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { AiOutlineShoppingCart } from "react-icons/ai";

import ShowUserCartFromStoageSide, {
  UserT,
} from "./ShowUserCartFormStoageSide";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { useEffect, useState } from "react";
import ShowUserCartFromDBSide from "./ShowUserCartFormDBSide";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

const SideCart = () => {
  const user = useCurrentUser();
  const [isCart, setIsCart] = useState(true);
  const [currentPath, setCurrentPath] = useState();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const paths = [
      "/cart",
      "/checkout",
      "/stripe/purchase-success",
    ] as string[];
    const hideCart = paths.some((path) => pathname.includes(path));

    setIsCart(!hideCart);
  }, [pathname]);

  return (
    <div>
      {isCart && (
        <Sheet>
          <SheetTrigger asChild className={isCart ? "block" : "hidden"}>
            <Button variant="outline">
              <div>
                <AiOutlineShoppingCart />
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent className="mt-12 flex flex-col gap-5">
            <SheetHeader className="mt-12">
              <SheetTitle>My Shopping Basket</SheetTitle>
              <SheetDescription>Enjoy shopping!</SheetDescription>
            </SheetHeader>
            <ScrollArea className="w-full h-[50%] sm:h-[70%] rounded-md border">
              <div>
                <ShowUserCartFromDBSide user={user!} />
              </div>
            </ScrollArea>
            <SheetFooter>
              <SheetTrigger asChild className="m-auto">
                <Button asChild>
                  <Link href={"/cart"}>Checkout</Link>
                </Button>
              </SheetTrigger>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default SideCart;
