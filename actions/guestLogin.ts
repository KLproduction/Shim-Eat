"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export const guestLogin = async () => {
  const uid = randomUUID();
  const email = `guest-${uid}@example.com`;
  const rawPassword = randomUUID();

  await db.user.create({
    data: {
      email,
      password: await bcrypt.hash(rawPassword, 10),
      name: `Guest ${uid.slice(0, 8)}`,
      emailVerified: new Date(),
      isGuest: true,
      guestExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  await signIn("credentials", {
    email,
    password: rawPassword,
    redirectTo: "/", // or `redirect:` if you use the latest API
  });
};
