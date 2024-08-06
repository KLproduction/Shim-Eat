"use server";

import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { getVerificationTokenBytoken } from "@/data/verification-token";

export const newVerification = async (token: string, userId?: string) => {
  const existingToken = await getVerificationTokenBytoken(token);

  console.log(userId);
  console.log("TOKEN:", token);

  if (!existingToken) {
    return { error: "Token dose not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  if (userId !== "undefined") {
    const existingUser = await getUserById(userId!);

    if (!existingUser) {
      return { error: "User dose not exist" };
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        email: existingToken.email,
        emailVerified: new Date(),
      },
    });
  }

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  if (userId === "undefined") {
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "email dose not exist" };
    }

    await db.user.update({
      where: {
        email: existingUser.email!,
      },
      data: {
        email: existingToken.email,
        emailVerified: new Date(),
      },
    });
  }

  return { success: "Email verified!" };
};
