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
import { AiFillShopping } from "react-icons/ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { useEffect, useState } from "react";
import ShowUserCartFromDBSide from "./ShowUserCartFormDBSide";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ExtenderUser } from "@/next-auth";
import { userCart } from "@/lib/type";
import { getCartItembyId } from "@/data/getCartItembyId";

interface SideCartProps {
  user: ExtenderUser;
  className?: string;
}

const SideCart = ({ className, user }: SideCartProps) => {
  const [isCart, setIsCart] = useState(true);
  const pathname = usePathname();
  const [userProduct, setUserProduct] = useState<userCart | null>();

  useEffect(() => {
    (async () => {
      if (user?.id) {
        const data = await getCartItembyId(user.id);
        setUserProduct(data);
      }
    })();
  }, []);

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
    <div className={`${className}`}>
      {isCart && (
        <Sheet>
          <SheetTrigger asChild className={isCart ? "block" : "hidden"}>
            <div className="cursor-pointer text-xl text-green-500 hover:text-orange-600 sm:text-3xl sm:text-zinc-600 sm:hover:text-green-500">
              <AiFillShopping />
            </div>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-5 sm:z-[999999]">
            <SheetHeader className="mt-12">
              <SheetTitle>My Shopping Basket</SheetTitle>
              <SheetDescription>Enjoy shopping!</SheetDescription>
            </SheetHeader>
            {user?.id && userProduct?.items.length! > 0 ? (
              <ScrollArea className="h-[60%] w-full rounded-md border sm:h-[70%]">
                <div>
                  <ShowUserCartFromDBSide user={user!} />
                  {/* <ShowUserCartFromDBSideTest user={user!} /> */}
                </div>
              </ScrollArea>
            ) : (
              <div className="mt-[70%] flex flex-col items-center justify-center gap-5">
                <h1 className="text-sm">Your shopping cart is empty</h1>
                <SheetTrigger asChild>
                  <Button asChild>
                    <Link href={"/menu"}>Continue Shopping</Link>
                  </Button>
                </SheetTrigger>
              </div>
            )}
            {user?.id && userProduct?.items.length! > 0 && (
              <SheetFooter>
                <SheetTrigger asChild className="m-auto">
                  <Button asChild>
                    <Link href={"/cart"}>Checkout</Link>
                  </Button>
                </SheetTrigger>
              </SheetFooter>
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default SideCart;
