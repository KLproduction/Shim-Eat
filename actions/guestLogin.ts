"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const guestLogin = async () => {
  const email = "guest@example.com";
  const password = "guestpass";

  let guest = await db.user.findUnique({ where: { email } });

  if (!guest) {
    const hashed = await bcrypt.hash(password, 10);
    guest = await db.user.create({
      data: {
        email,
        password: hashed,
        name: "Guest",
        emailVerified: new Date(),
      },
    });
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
};
