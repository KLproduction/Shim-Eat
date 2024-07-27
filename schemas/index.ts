import { ProductCategory, UserRole } from "@prisma/client";
import * as z from "zod";

export const HandleQuantityChangeSchema = z.object({
  quantity: z.number().min(1),
});
export const ChangeOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "COMPLETE", "CANCELLED"]),
  orderId: z.string(),
});
export const ChangeDeliveryStatusSchema = z.object({
  deliveryStatus: z.enum(["PENDING", "DISPATCHED", "DELIVERED"]),
  orderId: z.string(),
});

export const ProductAddingSchema = z.object({
  name: z.string().min(1, {
    message: "Please give a name",
  }),
  description: z.string().min(1, {
    message: "description required.",
  }),
  category: z.enum([
    ProductCategory.salad,
    ProductCategory.main,
    ProductCategory.drinks,
  ]),
  price: z.number().min(1),
  image: z.string().min(1, {
    message: "Image required.",
  }),

  status: z.enum(["onSale", "notAvailable"]),
});
export const ProductsettingSchema = z.object({
  name: z.string().min(1, {
    message: "Please give a name",
  }),
  description: z.string().min(1, {
    message: "description required.",
  }),
  category: z.enum([
    ProductCategory.salad,
    ProductCategory.main,
    ProductCategory.drinks,
  ]),
  price: z.number().min(1),
  image: z.string().min(1, {
    message: "Image required.",
  }),

  status: z.enum(["onSale", "notAvailable"]),
});

export const AddOnsSchema = z.object({
  type: z.enum(["standard", "large"]),
  side: z.enum(["redRice", "potatoSalad", "brownToast", "noAddOns"]),
});

export const TodoSchema = z.object({
  content: z.string(),
});

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    },
  )

  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    },
  );

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 Characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum 8 Characters required",
  }),
});
