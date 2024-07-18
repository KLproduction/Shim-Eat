import {Header} from "@/components/auth/header"
import{

} from "@/components/ui/card"
import { Button } from "../ui/button"
import Link from "next/link"
import { CardWapper } from "./CardWrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export const ErrorCard = () =>{
    return(
        <div className=" flex flex-col justify-center items-center h-full">
            <CardWapper 
            headerLabel="Oops! Something went wrong!"
            backBtnHref="/auth/login"
            backBtnLabel="Back">
                <div className="w-full flex items-center justify-center">
                    <ExclamationTriangleIcon className=" text-destructive"/>
                </div>
            </CardWapper>

        </div>
    )
}