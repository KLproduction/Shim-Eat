import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { UserRole } from "@prisma/client"
import { string } from "zod"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"


export const { handlers, auth, signIn, signOut} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  pages:{
    signIn:"/auth/login",
    error:"/auth/error",
  },
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{
          id:user.id
        },
        data:{emailVerified: new Date()}
      })
    }
  },
  callbacks:{
    async signIn({user,account}) {

      // Allow OAuth without email verification

      if (account?.provider!=="credentials") return true;
      
      if (typeof user.id === "undefined"){
        return false
      }
      const existingUser = await getUserById(user.id)

      if(!existingUser?.emailVerified) return false

      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if(!twoFactorConfirmation) return false

        //Dele two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where:{id:twoFactorConfirmation.id}
        })
      }

      return true
    },

    async session ({token,session}){

      if (token.sub && session.user){
        session.user.id = token.sub
      }
      if (token.sub && session.user){
        session.user.role = token.role as UserRole
      }
      if (session.user){
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }
      if (session.user){
        session.user.name = token.name
        session.user.isOAuth = token.isOAuth as boolean
      }
      if (session.user.email){
        session.user.email = token.email!
      }


      
      return session
    },
    async jwt({token}){

      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id)

      
      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    }
  }
  
})