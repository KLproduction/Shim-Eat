"use server"

import { db } from "@/lib/db";

export const postTodo = async(userId:string, content:string) =>{
    if(content.length<=0){
        return{error:"Content cannot be empty!"}
    }
    await db.todo.create({
        data:{
            content: content,
            userId: userId,
        }
    })

    return{success:"Todo Added!"}


}