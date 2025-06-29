"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const checkServerSession = async (path: string = "/") => {
    const session = await auth()

    if(!session){
        const cookieStore = cookies()
        cookieStore.set("postLoginRedirect", path, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        })
        redirect("/auth/login")
    }
}