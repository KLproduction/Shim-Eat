import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getUserOrder } from "@/data/getUserOrder";
import { ADDONSPRICE } from "@/data/products";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/formatPrice";
import { TUserOrder } from "@/lib/type";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

type CheckOutFormProps = {
  products: TUserOrder;
  clientSecret: string;
};

const successPage = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );
  if (paymentIntent.metadata.orderId == null) return notFound();
  const products = await db.userOrder.findUnique({
    where: {
      id: paymentIntent.metadata.orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!products?.id) {
    return (
      <div className="flex flex-col justify-center items-center min-h-full gap-3">
        <h1 className=" text-xl">No Order Found!</h1>
        <Button asChild variant={"link"} size={"sm"}>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
    );
  }
  const isSuccess = paymentIntent.status === "succeeded";
  if (isSuccess) {
    console.log(paymentIntent.metadata);
  }

  return (
    <MaxWidthWrapper>
      <Card className="m-5 p-5 max-w-[280px] sm:max-w-full">
        <CardHeader className="text-xl">
          <div className="flex justify-center text-orange-500 font-bold">
            {isSuccess
              ? "Enjoy!".toUpperCase()
              : "Something went wrong, order not placed!"}
          </div>
        </CardHeader>
        <div className="text-sm">
          <CardDescription className=" flex justify-center flex-col min-h-full">
            <span className=" font-bold">Order reference: </span>
            <span>{products?.id}</span>
          </CardDescription>
        </div>
        <div className="max-w-5xl w-full mx-auto space-y-8">
          <div>
            {products?.orderItems.map((product) => (
              <div
                className="flex flex-col items-center gap-5 m-5"
                key={product.id}
              >
                <div className=" grid grid-cols-1 sm:grid-cols-10 items-center gap-5 text-zinc-600">
                  <img
                    src={product.product.image || undefined}
                    alt=""
                    className="max-w-[100px] rounded-full col-span-2"
                  />
                  <h1 className=" col-span-3">{product.product.name}</h1>
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
                  <h1 className="col-span-1">Quantity: {product.quantity}</h1>
                  <h1 className=" col-span-2">
                    Price:
                    {formatPrice(
                      (product.price + product.extraPrice) * product.quantity
                    )}
                  </h1>
                </div>
              </div>
            ))}
            <h1 className="text-xl flex justify-end text-zinc-600">
              Order Total:{formatPrice(products?.orderPrice!)}{" "}
            </h1>
          </div>
        </div>
      </Card>
      <div className="flex justify-end p-5">
        <Button asChild variant={"link"} size={"lg"}>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default successPage;
