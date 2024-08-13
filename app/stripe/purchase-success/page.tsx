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
    searchParams.payment_intent,
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
      <div className="flex min-h-full flex-col items-center justify-center gap-3">
        <h1 className="text-xl">No Order Found!</h1>
        <Button asChild variant={"link"} size={"sm"}>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
    );
  }

  if (products.status === "PENDING") {
    return (
      <div>
        Something went wrong, payment not success, please reload the page
      </div>
    );
  }

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <MaxWidthWrapper className="pb-12 sm:p-5 sm:pt-20">
      <Card className="m-5 mx-auto max-w-[280px] p-5 sm:max-w-full">
        <CardHeader className="text-xl">
          <div className="flex justify-center font-bold text-orange-500">
            {isSuccess
              ? "Payment success!".toUpperCase()
              : "Something went wrong, order not placed!"}
          </div>
        </CardHeader>
        <div className="text-sm">
          <CardDescription className="flex min-h-full flex-col justify-center">
            <span className="font-bold">Order reference: </span>
            <span>{products?.id}</span>
            <span className="mt-3 font-bold">Delivery Address:</span>
            <span>{products.deliveryAddress}</span>
          </CardDescription>
        </div>
        <div className="mx-auto w-full max-w-5xl space-y-8">
          <div>
            {products?.orderItems.map((product) => (
              <Card
                className="my-5 flex flex-col items-center p-3"
                key={product.id}
              >
                <div className="grid grid-cols-1 items-center gap-5 text-zinc-600 sm:grid-cols-10">
                  <img
                    src={product.product.image || undefined}
                    alt=""
                    className="col-span-2 max-w-[100px] rounded-full"
                  />
                  <h1 className="col-span-3">{product.product.name}</h1>
                  <div className="col-span-2 text-sm">
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
                  <h1 className="col-span-1">Quantity: {product.quantity}</h1>
                  <h1 className="col-span-2">
                    Price:
                    {formatPrice(
                      (product.price + product.extraPrice) * product.quantity,
                    )}
                  </h1>
                </div>
              </Card>
            ))}
            <h1 className="flex justify-end text-xl text-zinc-600">
              Order Total:{formatPrice(products?.orderPrice!)}{" "}
            </h1>
          </div>
        </div>
      </Card>
      <div className="flex justify-end p-5 pb-12">
        <Button asChild variant={"link"} size={"lg"}>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default successPage;
