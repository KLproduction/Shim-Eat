import Stripe from "stripe";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import CheckOutForm from "./_component/CheckOutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const Testpage = async () => {
  const user = await currentUser();
  if (!user) return;
  const products = await db.userOrder.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(products?.orderPrice! * 100),
    currency: "GBP",
    metadata: {
      orderId: products?.id!,
      userId: products?.userId!,
    },
  });

  if (paymentIntent.client_secret === null) {
    throw Error("Stripe failed to create payment intent");
  }

  return (
    <CheckOutForm
      products={products!}
      clientSecret={paymentIntent.client_secret}
    />
  );
};

export default Testpage;
