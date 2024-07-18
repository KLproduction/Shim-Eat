"use client";

import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ADDONSPRICE } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import { TUserOrder, userCart } from "@/lib/type";
import {
  AddressElement,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState, useTransition } from "react";

type CheckOutFormProps = {
  products: TUserOrder;
  clientSecret: string;
};

type FormProps = {
  orderPrice: number;
};
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckOutForm = ({ products, clientSecret }: CheckOutFormProps) => {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div>
        {products.orderItems.map((product, index) => (
          <div className="flex flex-col items-center gap-5 m-5 " key={index}>
            <div className=" grid grid-cols-1 sm:grid-cols-10 items-center gap-5 text-zinc-600">
              <img
                src={product.product.image || undefined}
                alt=""
                className="max-w-[100px] rounded-full col-span-2"
              />
              <h1 className=" col-span-2">{product.product.name}</h1>
              <div className="text-sm col-span-2">
                <h2>
                  Size: {product?.sizeOption?.toUpperCase()} <br />+ (
                  {formatPrice(
                    ADDONSPRICE.size[
                      product?.sizeOption as keyof typeof ADDONSPRICE.size
                    ]
                  )}
                  )
                </h2>
                <h2>
                  Side: {product?.sideOption?.toUpperCase()}
                  <br /> + (
                  {formatPrice(
                    ADDONSPRICE.addOns[
                      product?.sideOption as keyof typeof ADDONSPRICE.addOns
                    ]
                  )}
                  )
                </h2>
              </div>
              <h1>Quantity: {product.quantity}</h1>
              <h1 className=" col-span-2">
                Price:
                {formatPrice(
                  (product.price + product.extraPrice) * product.quantity
                )}
              </h1>
            </div>
          </div>
        ))}
        <h1 className="text-xl flex justify-center sm:justify-end p-3 text-zinc-600">
          Order Total:{formatPrice(products.orderPrice)}{" "}
        </h1>
      </div>
      <div className="flex gap-4 items-center"></div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form orderPrice={products.orderPrice} />
      </Elements>
    </div>
  );
};
const Form = ({ orderPrice }: FormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(!loading);
    if (stripe == null || elements == null) return;
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (
          error?.type === "card_error" ||
          error?.type === "validation_error"
        ) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      });
    setLoading(!loading);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>Confirm Payment</CardHeader>
        <CardDescription>
          <FormError />
        </CardDescription>
        <CardContent>
          <PaymentElement />
          <div className=" my-4">
            <LinkAuthenticationElement />
            <AddressElement options={{ mode: "shipping" }} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Button
            type="submit"
            className="w-full"
            disabled={stripe == null || elements == null || pending}
          >
            {loading ? "Purchasing" : `Check Out ${formatPrice(orderPrice)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CheckOutForm;
