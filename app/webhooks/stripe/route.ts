import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
  });
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const orderId = charge.metadata.orderId;
    const email = charge.billing_details.email;
    const pricePaid = charge.amount / 100;
    const shippingAddress = `${charge.shipping?.address?.line1 || ""}${
      charge.shipping?.address?.line2
        ? "," + charge.shipping?.address.line2
        : ""
    },${charge.shipping?.address?.city},${
      charge.shipping?.address?.postal_code
    }`;

    const products = await db.userOrder.findUnique({
      where: { id: orderId },
    });
    if (!products || !email) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const userOrder = await db.userOrder.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });

    if (userOrder) {
      await db.userOrder.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          deliveryAddress: shippingAddress,
          amountReceived: pricePaid,
          clientEmail: email,
        },
      });
      const userCart = await db.cart.findUnique({
        where: { userId: userOrder.user.id },
      });

      if (userCart) {
        const existingUser = await db.user.findUnique({
          where: {
            id: userCart.userId,
          },
        });

        await db.user.update({
          where: {
            id: existingUser?.id,
          },
          data: {
            totalSpend: existingUser?.totalSpend! + pricePaid,
          },
        });
        await db.cartItem.deleteMany({
          where: { cartId: userCart.id },
        });
      }
    }
  }
  return new NextResponse("ok", { status: 200 });
}
