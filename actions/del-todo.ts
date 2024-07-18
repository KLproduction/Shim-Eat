"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const delTodo = async(id:string) =>{
    await  db.todo.delete({
        where:{
            id
        }
    })

    revalidatePath("/todo")
}