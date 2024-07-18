"use server"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import * as z from "zod"
import { sendPasswordResentEmail } from "@/lib/mail"
import { generateResetPasswordToken } from "@/lib/tokens"

export const reset = async (values:z.infer<typeof ResetSchema>)=>{
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success){
        return {error:"Invalid email!"}
    }

    const {email} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser){
        return {error:"Email not found!"}
    }
    
    const passwordResetToken = await generateResetPasswordToken(email)

    await sendPasswordResentEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    )

    return{success:"Reset mail sent!"}
}