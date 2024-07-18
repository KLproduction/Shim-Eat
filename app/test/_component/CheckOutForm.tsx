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
import { formatPrice } from "@/lib/formatPrice";
import { TUserOrder } from "@/lib/type";
import {
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
      <div key={products.id}>
        {products.orderItems.map((product) => (
          <div className="flex flex-col items-center gap-5 m-5">
            <div className=" grid grid-cols-6 items-center gap-5">
              <img
                src={product.product.image || undefined}
                alt=""
                className="max-w-[100px] rounded-full col-span-1"
              />
              <h1 className=" col-span-2">{product.product.name}</h1>
              <div className="flex flex-col justify-start">
                <h3>{product.sizeOption}</h3>
                <h3>{product.sideOption}</h3>
              </div>
              <h1 className=" col-span-2">
                Price:
                {formatPrice(
                  (product.price + product.extraPrice) * product.quantity
                )}
              </h1>
            </div>
          </div>
        ))}
        <h1 className="text-xl flex justify-end">
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startTransition(() => {
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
    });
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
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Button
            type="submit"
            className="w-full"
            disabled={stripe == null || elements == null || pending}
          >
            {pending ? "Purchasing" : `Check Out ${formatPrice(orderPrice)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CheckOutForm;
