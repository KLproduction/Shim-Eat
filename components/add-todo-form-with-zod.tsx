
"use client"

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { postTodo } from "@/data/post-todo";
import { useEffect, useState } from "react";
import { getUserById } from "@/data/user";
import { useRouter } from "next/navigation";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema } from "@/schemas";
import { CardWapper } from "./auth/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { Input } from "./ui/input";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { useTransition } from 'react'
import { NewPasswordSchema } from '@/schemas'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/actions/new-password'
import { ResetForm } from "./auth/ResetForm";

export const AddTodoFormZod = ({ userId }: { userId: string }) => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const route = useRouter()
    const form = useForm<z.infer<typeof TodoSchema>>({
        resolver: zodResolver(TodoSchema),
        defaultValues:{
          content:""
        }
      })

    
    const onSubmit = async (data:z.infer<typeof TodoSchema>)=>{
        setError("")
        setSuccess("")
        startTransition(()=>{
            postTodo(userId,data.content)
            .then((data)=>{
                setError(data?.error)
                setSuccess(data?.success)
            })
            
        })
        console.log(form.getValues().content)
        form.reset()
        route.refresh()
        }


    
        return (
            <div className='flex items-center justify-center h-full my-10'>
              
  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-6'>
                        <div className=' space-y-4'>
                          <FormField
                          control={form.control}
                          name="content"
                          render={({field})=>(
                            <FormItem>
                              <FormLabel>Todo</FormLabel>
                              <FormControl>
                                <Input
                                {...field}
                                placeholder='Say somting!'
                                type='text'
                                disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                          )}
                          />
                      
        
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button
                        typeof='submit'
                        className=' w-full'
                        disabled={isPending}>
                          Add Todo
                        </Button>
                    </form>
                  </Form>

            </div>
          )
        }