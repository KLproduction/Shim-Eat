import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(request: NextRequest) {
  const isLoggedIn = async () => {
    const session = await auth();
    if (!session) {
      return false;
    }
    return true;
  };

  if (await isLoggedIn()) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: [
    "/setting",
    "/admin",
    "/server",
    "/client",
    "/cart",
    "/checkout",
    "/stripe/purchase-success",
    "/order",
    "/admin/order/order-details",
    "/admin/order",
    "/admin/products",
    "/admin/products/product-details",
  ],
};
