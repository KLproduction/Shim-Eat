"use server";

"use server";

import { cookies } from "next/headers";

export async function readAndDeletePostLoginRedirect() {
  const cookieStore = cookies();
  const cookieRedirect = cookieStore.get("postLoginRedirect")?.value;
  if (cookieRedirect) {
    cookieStore.set("postLoginRedirect", "", { expires: new Date(0) });
  }
  return cookieRedirect ?? null;
}
