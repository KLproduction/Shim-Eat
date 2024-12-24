import { ADDONSPRICE } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import { CartItem } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import { useOnChangeCartItem } from "@/hooks/cart";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Trash2 } from "lucide-react";

type Props = {
  data: any;
  cartId: string;
};

const CartItemCard = ({ data: item, cartId }: Props) => {
  const {
    handleQuantityAddingMutate,
    handleQuantityReducingMutate,
    deleteCartItemMutate,
    setNewQuantity,
    isDeleting,
    newQuantity,
  } = useOnChangeCartItem(
    cartId,
    item.product.id,
    item.sizeOption,
    item.sideOption,
    item.quantity,
  );

  return (
    <div className="mt-12 h-full w-full">
      <div className="p-3" key={`${item.id}-${item.productId}`}>
        <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-white p-4 shadow sm:grid sm:grid-cols-5">
          <img
            src={item?.product.image || undefined}
            className="col-span-1 h-auto max-w-[100px] items-center rounded-full object-cover sm:items-start"
          />
          <div className="flex flex-col items-center gap-2 sm:col-span-2 sm:items-start">
            <h1 className="text-lg font-bold sm:col-span-2">
              {item?.product.name}
            </h1>
            <div className="text-sm">
              <h2>
                Size: {item?.sizeOption?.toUpperCase()} + (
                {formatPrice(
                  ADDONSPRICE.size[
                    item?.sizeOption as keyof typeof ADDONSPRICE.size
                  ],
                )}
                )
              </h2>
              <h2>
                Side: {item?.sideOption?.toUpperCase()} + (
                {formatPrice(
                  ADDONSPRICE.addOns[
                    item?.sideOption as keyof typeof ADDONSPRICE.addOns
                  ],
                )}
                )
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Button
                variant={"ghost"}
                className="px-2 text-2xl"
                onClick={() => {
                  setNewQuantity(newQuantity - 1),
                    handleQuantityReducingMutate();
                }}
              >
                -
              </Button>

              <Label className="p-3 text-xl">{newQuantity}</Label>
              <Button
                variant={"ghost"}
                className="text-md px-2"
                onClick={() => {
                  setNewQuantity(newQuantity + 1), handleQuantityAddingMutate();
                }}
              >
                +
              </Button>
            </div>
            <h1 className="mt-2 text-lg">
              Total:{" "}
              {formatPrice(
                item?.quantity! * (item?.product.price! + item?.extraPrice!),
              )}
            </h1>
          </div>
          <div className="sm:col-span-1 sm:ml-auto sm:justify-center">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => deleteCartItemMutate()}
              disabled={isDeleting}
              className="m-2 rounded p-2 text-red-500"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
