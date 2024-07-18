'use client'

import Link from "next/link";
import { Card , CardContent,CardFooter,CardHeader} from "../ui/card";
import { Social } from "./Social";
import { Header } from "./header";

interface CardWrapperProps{
    children : React.ReactNode;
    headerLabel: string;
    backBtnLabel: string;
    backBtnHref: string;
    showSocial?: boolean;
}

export const CardWapper = ({
    children,
    headerLabel,
    backBtnLabel,
    backBtnHref,
    showSocial

}: CardWrapperProps)=>{
    return(
        <Card className=" w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial &&(
                <CardFooter>
                    <Social></Social>
                </CardFooter>
            )}
            <div className="flex justify-center items-center">
                <Link className="text-sm p-5" href={backBtnHref}>{backBtnLabel}</Link>
            </div>
        </Card>
    )
}