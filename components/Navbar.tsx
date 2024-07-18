import Link from "next/link";
import { Button } from "./ui/button";

import { LoginButtonProps } from "./auth/loginBtn";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";
import { currentUser } from "@/lib/auth";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import SideCart from "./SideCart";
import { useEffect, useState } from "react";
import AdminSwtich from "./AdminSwitch";
import SignOutBtn from "./auth/SignOutBtn";
import GoogleSignInBtn from "./auth/GoogleSignInBtn";
import GitSignInBtn from "./auth/GitSignInBtn";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExtenderUser } from "@/next-auth";

const navList = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Menu",
    path: "/menu",
  },
  {
    label: "Test",
    path: "/test",
  },
];

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="sticky z-[9999] h-30 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between px-4 text-lg">
          <div className="">
            <p className=" font-bold text-xl ">SHIM EAT</p>
          </div>
          <ul className="flex items-center justify-around gap-4 flex-1 text-orange-500">
            {navList.map(({ label, path }) => (
              <li key={label} className="font-bold hover:text-orange-200">
                <Link href={path}>{label}</Link>
              </li>
            ))}
          </ul>
          {!user?.id ? (
            <div className="flex gap-3 items-center p-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <h1 className=" rounded-2xl bg-orange-500 py-2 px-3 text-white text-sm">
                    Signin
                  </h1>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className=" w-40 pt-4 flex flex-col justify-center"
                  align="center"
                >
                  <DropdownMenuItem className="flex items-center justify-around">
                    <LoginButtonProps mode="redirect" asChild>
                      <Button variant={"ghost"} size={"sm"} className="m-0 p-0">
                        Sign In
                      </Button>
                    </LoginButtonProps>
                    <Avatar>
                      <FaUser />
                    </Avatar>
                  </DropdownMenuItem>
                  <div className=" h-px w-full bg-zinc-200" />
                  <DropdownMenuItem className=" flex items-center justify-around">
                    <GoogleSignInBtn />
                    <div className=" text-xl">
                      <AiFillGoogleCircle />
                    </div>
                  </DropdownMenuItem>
                  <div className=" h-px w-full bg-zinc-200" />

                  <DropdownMenuItem className=" flex items-center justify-around">
                    <GitSignInBtn />
                    <div className="text-xl">
                      <AiFillGithub />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className=" h-8 w-px bg-zinc-200" />
              <Link href={"/auth/register"} className=" text-gray-500 text-sm">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex gap-3 items-center p-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user?.image || ""}
                      className="max-w-[30px] rounded-full ring-2 ring-orange-500"
                    />
                    <AvatarFallback className=" bg-orange-300">
                      <FaUser />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className=" w-40 pt-4 flex flex-col justify-center"
                  align="center"
                >
                  <DropdownMenuItem className="flex items-center justify-around">
                    <Link href={"/order"}>My Order</Link>
                  </DropdownMenuItem>
                  <div className=" h-px w-full bg-zinc-200" />
                  <DropdownMenuItem className=" flex items-center justify-around">
                    <Link href={"/setting"}>Setting</Link>
                  </DropdownMenuItem>
                  <div className=" h-px w-full bg-zinc-200" />

                  <DropdownMenuItem className=" flex items-center justify-around">
                    <SignOutBtn />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <SideCart />
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
