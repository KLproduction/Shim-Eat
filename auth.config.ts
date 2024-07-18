import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";

export default {
    
  providers: [
    GitHub,
    Google,
    Credentials({
        authorize: async(credentials)=>{

            const validatedFields = LoginSchema.safeParse(credentials);
    
            if (validatedFields.success){
                const { email , password} = validatedFields.data;
    
                const user = await getUserByEmail(email);
                if(!user || !user.password) return null
    
                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password,
                )
                if (passwordMatch) return user;
            };
    
            return null;
        }
        

        
    })

  ],
} satisfies NextAuthConfig;
