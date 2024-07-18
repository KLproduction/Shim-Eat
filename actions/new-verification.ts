"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenBytoken } from "@/data/verification-token"

export const newVerification = async(token:string)=>{
    const existingToken = await getVerificationTokenBytoken(token)

    if(!existingToken){
        return{error:"Token dose not exist!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired){
        return{error:"Token has expired!"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser){
        return{error:"Email dose not exist"}
    }

    await db.user.update({
        where:{
            id:existingUser.id
        },
        data:{
            email: existingToken.email,
            emailVerified: new Date()
        }
    })

    await db.verificationToken.delete({
        where:{id:existingToken.id}
    })
    

    return {success:"Email verified!"}
}