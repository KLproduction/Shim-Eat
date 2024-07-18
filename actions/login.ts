"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenbyEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>,
  callbackUrl?:string|null
) => {
  const validatedFieds = LoginSchema.safeParse(values);

  if (!validatedFieds.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, code } = validatedFieds.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenbyEmail(existingUser.email)
      if(!twoFactorToken){
        return {error:"Invalid code!"}
      }

      if(twoFactorToken.token !== code){
        return{error:"Invalid code!"}
      }

      const hasExpired = new Date(twoFactorToken.expires)< new Date() 

      if (hasExpired){
        return{error:"Code expired!"}
      }

      await db.twoFactorToken.delete({
        where:{id:twoFactorToken.id}
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      if(existingConfirmation){
        await db.twoFactorConfirmation.delete({
            where:{id : existingConfirmation.id}
        })
      }

        await db.twoFactorConfirmation.create({
            data:{
                userId: existingUser.id
            }
        })

    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);
      return { twoFactor: true };
    }

  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/"
    });



  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Invalid credentials!" };
      }
    }
    throw e;
  }
};
