import Stripe from "stripe";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import CheckOutForm from "../_component/CheckOutForm";
import MySpinner from "@/components/ui/MySpinner";
import { revalidatePath } from "next/cache";
import { getOrderByOrderID } from "@/data/getOrderByOrderID";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const CheckOutPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) revalidatePath("/auth/login");

  const products = await getOrderByOrderID(params.id);
  if (!products) {
    <MySpinner />;
    revalidatePath("/cart");
  } else {
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
      <div className="pb-12 sm:pt-20">
        <CheckOutForm
          products={products!}
          clientSecret={paymentIntent.client_secret}
        />
      </div>
    );
  }
};

export default CheckOutPage;
