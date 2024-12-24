import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CartItem {
  productId: string;
  quantity: number;
  sizeOption: string;
  sideOption: string;
  extraPrice: number;
  itemTotal: number;
  image: string;
  price: number;
  name: string;
  category: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.sizeOption === action.payload.sizeOption &&
          item.sideOption === action.payload.sideOption,
      );

      if (existingItem) {
        // If the product already exists, update the quantity and recalculate total
        existingItem.quantity += action.payload.quantity;
        existingItem.itemTotal =
          (existingItem.extraPrice + action.payload.extraPrice) *
          existingItem.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateProductOptions: (
      state,
      action: PayloadAction<{
        productId: string;
        sizeOption?: string;
        sideOption?: string;
        extraPrice?: number;
      }>,
    ) => {
      const { productId, sizeOption, sideOption, extraPrice } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.sizeOption === sizeOption &&
          item.sideOption === sideOption,
      );

      if (existingItem) {
        if (sizeOption) existingItem.sizeOption = sizeOption;
        if (sideOption) existingItem.sideOption = sideOption;
        if (extraPrice !== undefined) existingItem.extraPrice = extraPrice;
      }
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        sideOption: string;
        sizeOption: string;
      }>,
    ) => {
      const { productId, quantity, sideOption, sizeOption } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.sideOption === sideOption &&
          item.sizeOption === sizeOption,
      );
      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.itemTotal =
          (existingItem.extraPrice + existingItem.extraPrice) *
          existingItem.quantity;
      }
    },
    removeProductFromCart(
      state,
      action: PayloadAction<{
        productId: string;
        sideOption: string;
        sizeOption: string;
      }>,
    ) {
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.sideOption === action.payload.sideOption &&
            item.sizeOption === action.payload.sizeOption
          ),
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
});
export const {
  addProductToCart,
  updateProductOptions,
  updateProductQuantity,
  removeProductFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice;
