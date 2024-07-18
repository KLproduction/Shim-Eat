'use client'

import React, { useState } from 'react'
import { CardWapper } from './CardWrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import * as z from "zod"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { useTransition } from 'react'
import { ResetSchema } from "@/schemas"
import { reset } from '@/actions/reset'



export const ResetForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues:{
      email:""
    }
  })

  const onSubmit = (values:z.infer<typeof ResetSchema>)=>{
    setError("")
    setSuccess("")
    startTransition(()=>{
      reset(values)
      .then((data)=>{
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
    console.log(values)
  }

  return (
    <div className='flex items-center justify-center h-full'>
      
      <CardWapper 
      headerLabel='Forgot your password?'
      backBtnLabel="Back to login"
      backBtnHref='/auth/login'
      >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'>
                <div className=' space-y-4'>
                  <FormField
                  control={form.control}
                  name="email"
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                        {...field}
                        placeholder='KL production@gmail.com'
                        type='email'
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
                  Send reset email
                </Button>
            </form>
          </Form>
      </CardWapper>
    </div>
  )
}

