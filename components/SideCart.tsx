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
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { ExtenderUser } from "@/next-auth";
import { userCart } from "@/lib/type";
import { getCartItembyId } from "@/data/getCartItembyId";
import ShowUserCartFromStoageSide from "./ShowUserCartFormStoageSide";

interface SideCartProps {
  user: ExtenderUser;
  className?: string;
}

const SideCart = ({ className, user }: SideCartProps) => {
  const [isCart, setIsCart] = useState(true);
  const pathname = usePathname();
  const [userProduct, setUserProduct] = useState<userCart | null>();
  const searchParams = useSearchParams();
  const [cartItemQuantity, setCartItemQuiantity] = useState(0);
  const route = useRouter();
  const cartcount = searchParams.get("u");

  useEffect(() => {
    (async () => {
      if (user?.id) {
        const data = await getCartItembyId(user.id);
        if (data) {
          setUserProduct(data);
        }
      }
    })();
  }, [user.id, pathname, cartcount]);

  useEffect(() => {
    const paths = [
      "/cart",
      "/checkout",
      "/stripe/purchase-success",
    ] as string[];
    const hideCart = paths.some((path) => pathname.includes(path));
    setIsCart(!hideCart);
  }, [pathname]);

  useEffect(() => {
    if (userProduct && userProduct?.items.length > 0) {
      const quantity = userProduct.items.reduce(
        (acc, item) => acc + (Number(item.quantity) || 0),
        0,
      );
      setCartItemQuiantity(quantity);
    } else {
      setCartItemQuiantity(0);
    }
  }, [userProduct, cartItemQuantity]);

  return (
    <div className={`${className}`}>
      {isCart && (
        <Sheet>
          <SheetTrigger asChild className={isCart ? "block" : "hidden"}>
            <div className="relative cursor-pointer text-xl text-green-500 hover:text-orange-500 sm:text-3xl sm:text-orange-500 sm:hover:text-green-500">
              <div>
                <AiFillShopping />
                <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform">
                  {/* <p className="rounded-full bg-orange-500 px-1.5 py-0.5 text-xs text-white">
                    {cartItemQuantity}
                  </p> */}
                </div>
              </div>
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
                  {/* <ShowUserCartFromStoageSide user={user} /> */}
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

// "use client";

// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "./ui/button";
// import { AiFillShopping } from "react-icons/ai";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import Link from "next/link";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import React, { startTransition, useEffect, useState } from "react";
// import ShowUserCartFromDBSide from "./ShowUserCartFormDBSide";
// import { useRouter, useSearchParams } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { ExtenderUser } from "@/next-auth";
// import { userCart } from "@/lib/type";
// import { getCartItembyId } from "@/data/getCartItembyId";
// import ShowUserCartFromStoageSide, {
//   TfetchedProducts,
// } from "./ShowUserCartFormStoageSide";
// import { getProductById } from "@/data/getProductById";
// import addLocalToCart from "@/actions/addLocalToCartDB";
// import { toast } from "sonner";
// import MySpinner from "./ui/MySpinner";
// import { cn } from "@/lib/utils";

// interface SideCartProps {
//   user: ExtenderUser;
//   className?: string;
// }

// const SideCart = ({ className, user }: SideCartProps) => {
//   const [isCart, setIsCart] = useState(true);
//   const pathname = usePathname();
//   const [userProduct, setUserProduct] = useState<TfetchedProducts>([]);
//   const searchParams = useSearchParams();
//   const [cartItemQuantity, setCartItemQuiantity] = useState(0);
//   const route = useRouter();
//   const cartcount = searchParams.get("u");
//   const [updateCount, setUpdateCount] = useState(0);
//   const [landing, setLanding] = useState(false);
//   const [isReadyForCheckout, setIsReadyForCheckout] = useState(false);

//   useEffect(() => {
//     const getProductsFromLocalCart = async () => {
//       const storedCart = localStorage.getItem("cart");
//       if (storedCart) {
//         const localItems = JSON.parse(storedCart);
//         const localUserItems = localItems.filter(
//           (item: { userId: string }) => item.userId === user?.id,
//         );
//         let fetchedProducts: TfetchedProducts = [];

//         for (const { productId } of localUserItems) {
//           try {
//             const fetchedProduct = await getProductById(productId);
//             if (!fetchedProduct) continue;
//             const localCartItems = await getDataFormLocal(fetchedProduct.id);

//             localCartItems?.forEach((item: any) => {
//               const uniqueKey = `${item.productId}-${item.sizeOption}-${item.sideOption}`;

//               const index = fetchedProducts.findIndex(
//                 (item: any) =>
//                   `${item.id}-${item.sizeOption}-${item.sideOption}` ===
//                   uniqueKey,
//               );

//               if (index !== -1) {
//                 fetchedProducts[index] = {
//                   ...fetchedProducts[index],
//                   quantity: item.quantity,
//                   extraPrice: item.extraPrice,
//                 };
//               } else {
//                 fetchedProducts.push({
//                   ...fetchedProduct,
//                   quantity: item.quantity,
//                   sizeOption: item.sizeOption,
//                   sideOption: item.sideOption,
//                   extraPrice: item.extraPrice,
//                   userId: user.id!,
//                 });
//               }
//             });
//           } catch (e) {
//             console.error(e);
//           }
//         }
//         setUserProduct(fetchedProducts);
//       }
//     };
//     getProductsFromLocalCart();
//     console.log("DATA UPDATE");
//     const currentpath = window.location.toString();
//     console.log("PATH,", currentpath);
//     console.log(userProduct.map((item) => item.quantity));
//   }, [pathname, user, cartcount, updateCount, landing]);

//   const getDataFormLocal = async (
//     productId: string,
//   ): Promise<TfetchedProducts[] | null> => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       const localItems = JSON.parse(storedCart);
//       return localItems.filter(
//         (item: { userId: string; productId: string }) =>
//           item.userId === user?.id && item.productId === productId,
//       );
//     }
//     return null;
//   };

//   useEffect(() => {
//     const paths = [
//       "/cart",
//       "/checkout",
//       "/stripe/purchase-success",
//     ] as string[];
//     const hideCart = paths.some((path) => pathname.includes(path));
//     setIsCart(!hideCart);
//   }, [pathname]);

//   useEffect(() => {
//     if (userProduct && userProduct.length > 0) {
//       const quantity = userProduct.reduce(
//         (acc, item) => acc + (Number(item.quantity) || 0),
//         0,
//       );
//       setCartItemQuiantity(quantity);
//     } else {
//       setCartItemQuiantity(0);
//     }
//   }, [userProduct, cartItemQuantity]);

//   const landingHandler = () => {
//     setLanding(true);
//     setTimeout(() => {
//       setLanding(false);
//     }, 500);
//   };

//   return (
//     <div className={`${className}`}>
//       {isCart && (
//         <Sheet>
//           <SheetTrigger
//             asChild
//             className={isCart ? "block" : "hidden"}
//             onClick={() => landingHandler()}
//           >
//             <div className="relative cursor-pointer text-xl text-green-500 hover:text-orange-500 sm:text-3xl sm:text-orange-500 sm:hover:text-green-500">
//               <div>
//                 <AiFillShopping />
//                 <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform"></div>
//               </div>
//             </div>
//           </SheetTrigger>
//           <SheetContent className="flex flex-col gap-5 border-none sm:z-[999999]">
//             <SheetHeader className="mt-12">
//               <SheetTitle>My Shopping Basket</SheetTitle>
//               <SheetDescription>Enjoy shopping!</SheetDescription>
//             </SheetHeader>
//             {user?.id && userProduct.length > 0 ? (
//               <>
//                 <div className={cn(landing ? "" : "hidden")}>
//                   <MySpinner />
//                 </div>
//                 <div className={cn(landing ? "hidden" : "")}>
//                   <ShowUserCartFromStoageSide user={user} />
//                 </div>
//               </>
//             ) : (
//               <div className="mt-[70%] flex flex-col items-center justify-center gap-5">
//                 <h1 className="text-sm">Your shopping cart is empty</h1>
//                 <SheetTrigger asChild>
//                   <Button asChild>
//                     <Link href={"/menu"}>Continue Shopping</Link>
//                   </Button>
//                 </SheetTrigger>
//               </div>
//             )}
//           </SheetContent>
//         </Sheet>
//       )}
//     </div>
//   );
// };

// export default SideCart;
