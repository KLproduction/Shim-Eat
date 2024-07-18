'use server';

import * as z from 'zod'
import { RegisterSchema } from '@/schemas';
import bcrypt from "bcryptjs"
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values:z.infer<typeof RegisterSchema>) =>{
    const validatedFieds = RegisterSchema.safeParse(values)

    if(!validatedFieds.success){
        return {error:"Invalid fields!"};
    }
    const {email, password, name} = validatedFieds.data
    const hashedPassword = await bcrypt.hash(password,10)
    const existingUser = await getUserByEmail(email)

    if (existingUser){
        return{error:"Email already in use"}
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })

    const verificationToken =  await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email,verificationToken.token)
    
    return {success:"Account Created! (Resend not supporting .app and no confirmation email can be sent.)"}
}