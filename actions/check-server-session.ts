"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const checkServerSession = async () =>{
    const session = await auth()

    if(!session){
        redirect("/auth/login")
    }
}