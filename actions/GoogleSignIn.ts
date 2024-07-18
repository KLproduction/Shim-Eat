"use server";

import { signIn } from "@/auth";
import { Button } from "../components/ui/button";

export async function googleSignIn() {
  await signIn("google");
}
