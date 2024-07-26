// "use client";
// import { getCartItembyId } from "@/data/getCartItembyId";
// import { ExtenderUser } from "@/next-auth";
// import { $Enums, AddOns, ProductCategory, Size } from "@prisma/client";
// import { startTransition, useEffect, useState, useTransition } from "react";
// import { Card } from "./ui/card";
// import MaxWidthWrapper from "./MaxWidthWrapper";
// import { Button } from "./ui/button";
// import { deleteCart } from "@/actions/deleteCart";
// import { getProductById } from "@/data/getProductById";
// import addToCart from "@/actions/addToCartDB";
// import { toast } from "sonner";
// import { getCartIdbyUserId } from "@/data/getCartIdbyUserId";
// import { formatPrice } from "@/lib/formatPrice";
// import { ADDONSPRICE } from "@/data/products";
// import Link from "next/link";

// export type UserT = {
//   user: ExtenderUser;
// };

// export type TfetchedProducts = ({
//   id?: string;
//   name?: string;
//   description?: string;
//   price?: number;
//   image?: string | null;
//   category?: $Enums.ProductCategory;
//   quantity?: number | null;
//   sizeOption?: Size;
//   sideOption?: AddOns;
//   extraPrice?: number;
// } | null)[];

// type TCartItem = {
//   userId: string;
//   productId: string;
//   quantity: number;
//   sizeOption: Size;
//   sideOption: AddOns;
//   addOnsPrice: number;
// };

// const ShowUserCartFromStoageSide = ({ user }: UserT) => {
//   const [pending, startTransition] = useTransition();
//   const [updateCount, setUpdateCount] = useState(0);
//   const [userProduct, setUserProduct] = useState<TfetchedProducts>([]);

//   useEffect(() => {
//     const getProductsFromLocalCart = async () => {
//       const storedCart = localStorage.getItem("local-cart");
//       if (storedCart) {
//         const localItems = JSON.parse(storedCart);
//         const localUserItems = localItems.filter(
//           (item: { userId: string }) => item.userId === user?.id
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
//                 (index: any) =>
//                   `${index.id}-${index.sizeOption}-${index.sideOption}` ===
//                   uniqueKey
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
//   }, [updateCount]);

//   const getDataFormLocal = async (
//     productId: string
//   ): Promise<TfetchedProducts[] | null> => {
//     const storedCart = localStorage.getItem("local-cart");
//     if (storedCart) {
//       const localItems = JSON.parse(storedCart);
//       return localItems.filter(
//         (item: { userId: string; productId: string }) =>
//           item.userId === user?.id && item.productId === productId
//       );
//     }
//     return null;
//   };

//   const handleQuantityChange = (
//     productId: string,
//     sizeOption: string,
//     sideOption: string,
//     newQuantity: number
//   ) => {
//     const updatedItems = userProduct.map((item) => {
//       if (
//         item?.id === productId &&
//         item.sizeOption === sizeOption &&
//         item.sideOption === sideOption
//       ) {
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });
//     updateQuantityInLocalStorage(
//       productId,
//       sizeOption,
//       sideOption,
//       newQuantity
//     );
//     setUserProduct(updatedItems);
//   };

//   const updateQuantityInLocalStorage = (
//     productId: string,
//     sizeOption: string,
//     sideOption: string,
//     newQuantity: number
//   ) => {
//     const storedCart = localStorage.getItem("local-cart");
//     if (storedCart) {
//       let cartItems = JSON.parse(storedCart);
//       const itemIndex = cartItems.findIndex(
//         (item: any) =>
//           item.productId === productId &&
//           item.sizeOption === sizeOption &&
//           item.sideOption === sideOption
//       );

//       if (itemIndex !== -1) {
//         cartItems[itemIndex].quantity = newQuantity;
//         localStorage.setItem("local-cart", JSON.stringify(cartItems));
//       }
//     }
//   };

//   const deleteCartAction = (
//     productId: string,
//     sizeOption: Size,
//     sideOption: AddOns
//   ) => {
//     startTransition(async () => {
//       const cartId = await getCartIdbyUserId(user.id!);
//       const storedCart = localStorage.getItem("local-cart");
//       if (storedCart) {
//         const cartItems = JSON.parse(storedCart);
//         const updatedCartItems = cartItems.filter((item: TCartItem) => {
//           return !(
//             item.userId === user.id &&
//             item.productId === productId &&
//             item.sizeOption === sizeOption &&
//             item.sideOption === sideOption
//           );
//         });
//         localStorage.setItem("local-cart", JSON.stringify(updatedCartItems));
//         setUserProduct(updatedCartItems);
//       }

//       deleteCart(cartId!, productId, sizeOption, sideOption);
//       setUpdateCount((count) => count + 1);
//       toast.success("Item Deleted.");
//     });
//   };

//   if (!user)
//     return (
//       <div className="flex flex-col justify-center items-center gap-5 h-full ">
//         <h1>Your shopping cart is empty</h1>
//         <Button>
//           <Link href={"/menu"}>Continue Shopping</Link>
//         </Button>
//       </div>
//     );

//   return (
//     <div className="flex justify-start items-center w-full h-auto">
//       <div className="mx-auto p-3">
//         {user.id ? (
//           <>
//             <div>
//               {userProduct?.map((item) => (
//                 <div
//                   className="p-3 "
//                   key={`${item?.id}-${user.id}-${item?.sizeOption}-${item?.sideOption}`}
//                 >
//                   <div className="flex flex-col justify-center gap-4 items-center bg-white rounded-md shadow p-3">
//                     <img
//                       src={item?.image || undefined}
//                       className="max-w-[60px] h-auto object-cover rounded-full items-center"
//                     />
//                     <div className="flex flex-col items-center gap-2">
//                       <h1 className="text-md font-bold ">{item?.name}</h1>
//                       <div className="text-sm">
//                         <h2>
//                           Size: {item?.sizeOption?.toUpperCase()} + (
//                           {formatPrice(
//                             ADDONSPRICE.size[
//                               item?.sizeOption as keyof typeof ADDONSPRICE.size
//                             ]
//                           )}
//                           )
//                         </h2>
//                         <h2>
//                           Side: {item?.sideOption?.toUpperCase()} + (
//                           {formatPrice(
//                             ADDONSPRICE.addOns[
//                               item?.sideOption as keyof typeof ADDONSPRICE.addOns
//                             ]
//                           )}
//                           )
//                         </h2>
//                       </div>
//                     </div>

//                     <div className="flex flex-col items-center">
//                       <input
//                         className="w-16 border border-zinc-400 rounded-lg text-center"
//                         type="number"
//                         value={item?.quantity!}
//                         onChange={(e) =>
//                           handleQuantityChange(
//                             item?.id!,
//                             item?.sizeOption!,
//                             item?.sideOption!,
//                             parseInt(e.target.value)
//                           )
//                         }
//                         min={1}
//                       />
//                       <h1 className="mt-2 text-lg">
//                         Total:{" "}
//                         {formatPrice(
//                           item?.quantity! * (item?.price! + item?.extraPrice!)
//                         )}
//                       </h1>
//                     </div>
//                     <div className="flex justify-end items-center">
//                       <Button
//                         size={"sm"}
//                         onClick={() =>
//                           deleteCartAction(
//                             item?.id!,
//                             item?.sizeOption!,
//                             item?.sideOption!
//                           )
//                         }
//                         disabled={pending}
//                         className="m-2 bg-red-500 text-white p-2 rounded"
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div>
//             <h1>Your shopping cart is empty</h1>
//             <Button>
//               <Link href={"/menu"}>Continue Shopping</Link>
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShowUserCartFromStoageSide;
