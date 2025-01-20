"use client";

import { addCartItems, addToCart } from "@/actions/addToCartDB";
import {
  getCartItemByCartId,
  getProductImage,
  onChangeCartItemQuantity,
  onDeleteCartItem,
} from "@/actions/product";
import { getOnSaleProducts } from "@/data/getOnsaleProducts";
import { getProductById } from "@/data/getProductById";
import { ADDONSPRICE } from "@/data/products";
import {
  addProductToCart,
  clearCart,
  removeProductFromCart,
  updateProductQuantity,
} from "@/redux/slices/add-to-cart-slice";
import { RootState, store } from "@/redux/store";
import { AddOnsSchema, AddToCartSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { $Enums, AddOns, Product, ProductCategory, Size } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const useAddToCart = (productId: string) => {
  const [addOnTotal, setAddOnTotal] = useState(0);
  const dispatch = useDispatch();

  const { data, isFetching } = useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      return await getProductById(productId);
    },
    staleTime: 1000 * 60 * 60,
  });

  const {
    setValue,
    watch,
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof AddToCartSchema>>({
    resolver: zodResolver(AddToCartSchema),
    defaultValues: {
      product: data?.name,
      quantity: 1,
      type: "standard",
      side: "brownToast",
    },
  });
  const {
    setValue: setDrinksValue,
    watch: watchDrinks,
    getValues: getDrinksValues,
    reset: resetDrinks,
    register: registerDrinks,
    handleSubmit: handleSubmitDrinks,
    formState: { errors: drinksErrors },
  } = useForm<z.infer<typeof AddToCartSchema>>({
    resolver: zodResolver(AddToCartSchema),
    defaultValues: {
      product: data?.name,
      quantity: 1,
      type: "standard",
      side: "noAddOns",
    },
  });

  const updateAddOnTotal = () => {
    const type = getValues().type;
    const side = getValues().side;
    const typePrice = ADDONSPRICE.size[type as keyof typeof ADDONSPRICE.size];
    const sidePrice =
      ADDONSPRICE.addOns[side as keyof typeof ADDONSPRICE.addOns];
    const AddOnPrice = (typePrice + sidePrice) * getValues().quantity;
    setAddOnTotal(AddOnPrice);
  };

  useEffect(() => {
    updateAddOnTotal();
  }, [watch("side"), watch("type"), getValues().quantity]);

  const { mutate: addToCartMutation, isPending: isAddingToCart } = useMutation({
    mutationFn: async () => {
      const values = getValues();
      return Promise.resolve(
        dispatch(
          addProductToCart({
            productId: productId,
            quantity: values.quantity,
            sizeOption: values.type,
            sideOption: values.side,
            extraPrice: addOnTotal,
            itemTotal: totalBasePrice + addOnTotal,
            image: data?.image!,
            price: data?.price!,
            name: data?.name!,
            category: data?.category!,
          }),
        ),
      );
    },

    onSuccess: () => {
      toast.success("Product added to cart!");
    },
  });
  const { mutate: addDrinksToCartMutation, isPending: isDrinksAddingToCart } =
    useMutation({
      mutationFn: async () => {
        const values = getDrinksValues();
        return Promise.resolve(
          dispatch(
            addProductToCart({
              productId: productId,
              quantity: values.quantity,
              sizeOption: values.type,
              sideOption: values.side,
              extraPrice: addOnTotal,
              itemTotal: drinksBasePrice,
              image: data?.image!,
              price: data?.price!,
              name: data?.name!,
              category: data?.category!,
            }),
          ),
        );
      },

      onSuccess: () => {
        toast.success("Product added to cart!");
      },
      onSettled: () => {
        console.log(getDrinksValues());
      },
    });

  const onSubmit = handleSubmit(() => {
    addToCartMutation();
  });

  const onDrinksSubmit = handleSubmitDrinks(() => {
    addDrinksToCartMutation();
  });

  const [totalBasePrice, setTotalBasePrice] = useState(Number(data?.price!));
  useEffect(() => {
    const price = data?.price || 0;
    const quantity = getValues().quantity || 1;

    if (price && quantity) {
      setTotalBasePrice(Number(price) * Number(quantity));
    }
  }, [data, watch("quantity")]);

  const [drinksBasePrice, setDrinksBasePrice] = useState(Number(data?.price!));
  useEffect(() => {
    const price = data?.price || 0;
    const quantity = getDrinksValues().quantity || 1;

    if (price && quantity) {
      setDrinksBasePrice(Number(price) * Number(quantity));
    }
  }, [data, watchDrinks("quantity")]);
  const addQuantity = () => {
    setValue("quantity", getValues().quantity + 1);
  };

  const reduceQuantity = () => {
    const currentQuantity = getValues().quantity || 1;
    if (currentQuantity > 1) {
      setValue("quantity", currentQuantity - 1);
    }
  };

  const addDrinksQuantity = () => {
    setDrinksValue("quantity", getDrinksValues().quantity + 1);
  };

  const reduceDrinksQuantity = () => {
    const currentQuantity = getDrinksValues().quantity || 1;

    if (currentQuantity > 1) {
      setDrinksValue("quantity", currentQuantity - 1);
    }
  };

  return {
    data,
    isFetching,
    setValue,
    watch,
    getValues,
    reset,
    register,
    errors,
    addOnTotal,
    addToCartMutation,
    isAddingToCart,
    onSubmit,
    totalBasePrice,
    addQuantity,
    reduceQuantity,
    registerDrinks,
    onDrinksSubmit,
    addDrinksQuantity,
    reduceDrinksQuantity,
    drinksBasePrice,
    drinksErrors,
    watchDrinks,
    getDrinksValues,
  };
};

export const useCartItem = () => {
  const userProduct = useSelector((state: RootState) => state.addCart.items);
  const route = useRouter();
  const queryClient = useQueryClient();
  const { mutate: addToCartMutate, isPending: isAddingToCart } = useMutation({
    mutationFn: async () => {
      const validatedCart = userProduct.map((item) => {
        const size = item.sizeOption as Size;
        const side = item.sideOption as AddOns;
        return {
          productId: item.productId,
          quantity: item.quantity,
          sizeOption: size,
          sideOption: side,
          extraPrice: item.extraPrice,
          itemTotal: item.itemTotal,
        };
      });
      return await addCartItems(validatedCart);
    },
    onSuccess: (data) => {
      route.push(`/cart/${data}`);
    },
    onError: (error) => {
      toast.error("Something went wrong, please try re-login");
      console.error("Error updating cart:", error);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart-items", data] });
    },
  });

  return {
    addToCartMutate,
    isAddingToCart,
  };
};

export const useCartMain = (cartId: string) => {
  const { data: cartItems, isFetching } = useQuery({
    queryKey: ["cart-items", cartId],
    queryFn: async () => {
      return await getCartItemByCartId(cartId);
    },
  });

  return {
    cartItems,
    isFetching,
  };
};

export const useOnChangeCartItem = (
  cartId: string,
  productId: string,
  sizeOption: Size,
  sideOption: AddOns,
  quantity: number,
) => {
  const queryClient = useQueryClient();
  const [newQuantity, setNewQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const updateReduxCartQuantity = () => {
    dispatch(
      updateProductQuantity({
        productId,
        quantity: newQuantity,
        sideOption,
        sizeOption,
      }),
    );
  };

  const removeReduxCart = () => {
    dispatch(
      removeProductFromCart({
        productId,
        sideOption,
        sizeOption,
      }),
    );
  };

  const { mutate: handleQuantityAddingMutate } = useMutation({
    mutationFn: async () => {
      await onChangeCartItemQuantity(
        cartId,
        productId,
        sizeOption,
        sideOption,
        newQuantity,
      );
    },
    onSuccess: () => {
      updateReduxCartQuantity();
      queryClient.invalidateQueries({ queryKey: ["cart-items", cartId] });
    },
  });
  const { mutate: handleQuantityReducingMutate } = useMutation({
    mutationFn: async () => {
      await onChangeCartItemQuantity(
        cartId,
        productId,
        sizeOption,
        sideOption,
        newQuantity,
      );
    },
    onSuccess: () => {
      updateReduxCartQuantity();
      queryClient.invalidateQueries({ queryKey: ["cart-items", cartId] });
    },
  });
  const { mutate: deleteCartItemMutate, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await onDeleteCartItem(cartId, productId, sizeOption, sideOption);
    },
    onSuccess: () => {
      removeReduxCart();
      queryClient.invalidateQueries({ queryKey: ["cart-items", cartId] });
    },
  });

  useEffect(() => {
    setNewQuantity(quantity);
  }, []);

  return {
    handleQuantityAddingMutate,
    handleQuantityReducingMutate,
    deleteCartItemMutate,
    setNewQuantity,
    newQuantity,
    isDeleting,
  };
};
