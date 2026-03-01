import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function proxy(request: NextRequest) {
  const session = await auth();
  if (session) {
    return NextResponse.next();
  }

  const response = NextResponse.redirect(new URL("/auth/login", request.url));
  response.cookies.set(
    "postLoginRedirect",
    request.nextUrl.pathname + request.nextUrl.search,
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  );

  return response;
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
    "/admin/users",
    "/admin/user-details",
  ],
};
