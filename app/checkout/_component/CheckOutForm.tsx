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
import MySpinner from "@/components/ui/MySpinner";
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
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div>
        {products.orderItems.map((product, index) => (
          <div className="m-5 flex flex-col items-center gap-5" key={index}>
            <Card className="flex min-w-[300px] flex-col items-center justify-center gap-5 p-3 text-zinc-600 transition-all sm:grid sm:grid-cols-6 sm:gap-5">
              <img
                src={product.product.image || undefined}
                alt=""
                className="mx-auto max-w-[100px] rounded-full sm:col-span-2"
              />
              <h1 className="sm:col-span-1">{product.product.name}</h1>
              <div className="text-sm sm:col-span-1">
                <h2>
                  Size: {product?.sizeOption?.toUpperCase()} <br />+ (
                  {formatPrice(
                    ADDONSPRICE.size[
                      product?.sizeOption as keyof typeof ADDONSPRICE.size
                    ],
                  )}
                  )
                </h2>
                <h2>
                  Side: {product?.sideOption?.toUpperCase()}
                  <br /> + (
                  {formatPrice(
                    ADDONSPRICE.addOns[
                      product?.sideOption as keyof typeof ADDONSPRICE.addOns
                    ],
                  )}
                  )
                </h2>
              </div>
              <h1>Quantity: {product.quantity}</h1>
              <h1 className="sm:col-span-1">
                Price:
                {formatPrice(
                  (product.price + product.extraPrice) * product.quantity,
                )}
              </h1>
            </Card>
          </div>
        ))}
        <h1 className="flex justify-center p-3 text-xl text-zinc-600 sm:justify-end">
          Order Total:{formatPrice(products.orderPrice)}{" "}
        </h1>
      </div>
      <div className="flex items-center gap-4"></div>
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
    localStorage.removeItem("cart");

    setLoading(!loading);
  };

  return (
    <>
      {loading && <MySpinner />}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>Confirm Payment</CardHeader>
          <CardDescription>
            <FormError />
          </CardDescription>
          <CardContent>
            <PaymentElement />
            <div className="my-4">
              <LinkAuthenticationElement />
              <AddressElement options={{ mode: "shipping" }} />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-full"
              disabled={stripe == null || elements == null || pending}
            >
              {loading
                ? "Purchasing..."
                : `Check Out ${formatPrice(orderPrice)}`}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default CheckOutForm;
