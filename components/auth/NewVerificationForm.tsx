"use client"

import { CardWapper } from "./CardWrapper"
import {BeatLoader} from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

const NewVerificationForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [error , setError] = useState<string | undefined>()
    const [success , setSucces] = useState<string | undefined>()
    const onSubmit = useCallback(()=>{
        if(success || error) return
        if(!token) {
            setError("Missing Token")
            return
        }
        newVerification(token)
        .then((data)=>{
            setSucces("")
            setError("")
            setSucces(data.success)
            setError(data.error)
        })
        .catch(()=>{
            setError("Something went wrong!")
        })
    },[token,success,error])

    useEffect(()=>{
        const timer = setTimeout(()=>{
            onSubmit()
        },1000)
    },[onSubmit])

  return (
    <div className=" flex items-center justify-center h-full">
        <CardWapper 
        headerLabel="Confirming your verification"
        backBtnHref="/auth/login"
        backBtnLabel="Back to Login"
        >
            <div className="w-full flex flex-col gap-5 items-center justify-center">
                {!success && !error && <BeatLoader/>}
                
                <FormSuccess message={success}/>
                {!success && <FormError message={error}/>}
                
            </div>

        </CardWapper>

    </div>
  )
}

export default NewVerificationForm