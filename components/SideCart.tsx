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
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ExtenderUser } from "@/next-auth";
import { RootState, store } from "@/redux/store";
import ShowUserCartFromStorageSide from "./ShowUserCartFormStoageSide";
import { useSelector } from "react-redux";
import { useCartItem } from "@/hooks/cart";
import { useSideCart } from "@/hooks/use-side-cart";

interface SideCartProps {
  user: ExtenderUser;
  className?: string;
}

const SideCart = ({ className, user }: SideCartProps) => {
  const { isOpen, open, close, setIsOpen } = useSideCart();
  const pathname = usePathname();
  const userProduct = useSelector((state: RootState) => state.addCart.items);
  const { addToCartMutate, isAddingToCart } = useCartItem();

  useEffect(() => {
    const paths = [
      "/cart",
      "/checkout",
      "/stripe/purchase-success",
    ] as string[];
    const hideCart = paths.some((path) => pathname.includes(path));
    if (hideCart) setIsOpen(false);
  }, [pathname, setIsOpen]);

  return (
    <div className={`${className}`}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div
            className="relative cursor-pointer text-xl text-green-500 hover:text-orange-500 sm:text-3xl sm:text-orange-500 sm:hover:text-green-500"
            onClick={open}
          >
            <div>
              <AiFillShopping />
              <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform">
                <p className="rounded-full bg-green-500 px-1.5 py-0.5 text-xs text-white">
                  {userProduct?.reduce((acc, item) => acc + item.quantity, 0)}
                </p>
              </div>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-5 sm:z-[999999]">
          <SheetHeader className="mt-12">
            <SheetTitle>My Shopping Basket</SheetTitle>
            <SheetDescription>Enjoy shopping!</SheetDescription>
          </SheetHeader>
          {userProduct?.length! > 0 ? (
            <ScrollArea className="h-[60%] w-full rounded-md border sm:h-[70%]">
              <div>
                <ShowUserCartFromStorageSide userProduct={userProduct} />
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
          {user?.id && userProduct?.length! > 0 && (
            <SheetFooter>
              <SheetTrigger asChild className="m-auto">
                <Button
                  onClick={() => addToCartMutate()}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? "Adding to Cart..." : "Proceed to Checkout"}
                </Button>
              </SheetTrigger>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideCart;
