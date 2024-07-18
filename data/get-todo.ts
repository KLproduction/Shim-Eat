"use server"

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const getTodo = async(userId:string) =>{
    const user = await getUserById(userId)
    return  db.todo.findMany({
        where:{
            userId: userId,
        }
    })

}