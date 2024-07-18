
"use client"

import { FieldValues, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { postTodo } from "@/data/post-todo";
import { useEffect } from "react";
import { getUserById } from "@/data/user";
import { useRouter } from "next/navigation";


export const AddTodoForm = ({ userId }: { userId: string }) => {
    const route = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues
    } = useForm()

    useEffect(() => {
        const fetchId = async () => {
            const user = await getUserById(userId);
            return user?.id;
        };
    
        const loadUser = async () => {
            const id = await fetchId();
        };
    
        loadUser();
        
    }, [userId]);
    
    const onSubmit = async (data:FieldValues)=>{
        postTodo(userId,data.content)
        reset()
        route.refresh()
        
        }

    
        return (
        <div className=" flex justify-center items-center">
          
                <form onSubmit={handleSubmit(onSubmit)}className="flex flex-col gap-3 items-center my-10">
                    <div className=" flex items-center gap-2">
                        <input
                            {...register("content")}
                            type="text"
                            placeholder="Say something..."
                            className="px-4 py-2 rounded border"
                            />
                    <Button type="submit" 
                    size="sm"
                    className="my-0 p-3"
                    disabled={isSubmitting}
                    >Submit</Button>
                    </div>
                {errors.content && (
                    <p className=" text-red-500">{`${errors.content.message}`}</p>
                )}
                </form>
        </div>
    );
}
