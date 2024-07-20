import {
  Size,
  AddOns,
  Product,
  CartItem,
  OrderStatus,
  $Enums,
} from "@prisma/client";

export type TAddProduct = {
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: $Enums.ProductCategory;
  status: $Enums.ProductStatus;
};

export type CartItemWithProduct = CartItem & {
  productId: string;
  quantity: number;
  addedOn: Date;
  sizeOption: Size;
  sideOption: AddOns;
  extraPrice: number;
  itemTotal: number;
  product: Product;
};

export type userCart = {
  id: string;
  userId: string;
  items: CartItemWithProduct[];
};

export type TaddCartToDB = {
  quantity?: number;
  sizeOption?: Size;
  sideOption?: AddOns;
  extraPrice?: number;
  itemTotal?: number;
  product: Product;
};

export type TOrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  sizeOption: Size;
  sideOption: AddOns;
  extraPrice: number;
  price: number;
  product: Product;
};

export type TUserOrder = {
  id: string;
  userId: string;
  orderItems: TOrderItem[];
  orderPrice: number;
  createdAt: Date;
  updatedAt: Date;
  clientEmail?: string | null;
  amountReceived?: number | null;
  deliveryAddress?: string | null;
  status?: OrderStatus;
  deliveryStatus?: $Enums.DeliveryStatus;
};
