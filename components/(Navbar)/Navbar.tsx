import Link from "next/link";
import { Button } from "../ui/button";

import { LoginButtonProps } from "../auth/loginBtn";
import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";
import { currentUser } from "@/lib/auth";
import {
  AiFillGoogleCircle,
  AiFillGithub,
  AiFillSetting,
} from "react-icons/ai";
import SideCart from "../SideCart";
import { useEffect, useState } from "react";
import AdminSwtich from "../AdminSwitch";
import SignOutBtn from "../auth/SignOutBtn";
import GoogleSignInBtn from "../auth/GoogleSignInBtn";
import GitSignInBtn from "../auth/GitSignInBtn";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExtenderUser } from "@/next-auth";
import { AiOutlineGoogle } from "react-icons/ai";
import ShowUserCartFromDBSideTest from "../ShowUserCartFormDBSideTest";
import { BsBagCheckFill } from "react-icons/bs";
import NavbarLargeSrceenDropdown from "./_components/NavbarLargeSrceenDropdown";
import { getCartIdbyUserId } from "@/data/getCartIdbyUserId";
import { getCartItembyId } from "@/data/getCartItembyId";
import AdminSwitch from "../AdminSwitch";

const navList = [
  {
    label: "Menu",
    path: "/menu",
  },
];

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="fixed inset-x-0 top-0 z-[9999] h-20 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex items-center justify-center px-4 text-lg">
          <div className="">
            <Link href="/" className="flex flex-col items-end font-black">
              <img src="/saladLogo.png" alt="logo" className="max-w-20" />
            </Link>
          </div>
          <ul className="flex flex-1 items-center justify-center gap-4 text-orange-500">
            {navList.map(({ label, path }) => (
              <li key={label}>
                <div className="text-3xl font-bold hover:text-orange-200">
                  <Link href={path}>{label}</Link>
                </div>
              </li>
            ))}
          </ul>
          {!user?.id ? (
            <div className="flex items-center gap-3 p-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <h1 className="rounded-2xl bg-orange-500 px-3 py-2 text-sm text-white">
                    Signin
                  </h1>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="z-[9999] m-0 flex w-40 flex-col justify-center p-0"
                  align="center"
                >
                  <DropdownMenuItem className="flex items-center justify-around">
                    <div>
                      <LoginButtonProps mode="redirect" asChild>
                        <Button variant={"ghost"} size={"sm"}>
                          Email Sign In
                        </Button>
                      </LoginButtonProps>
                    </div>
                    <div>
                      <Avatar>
                        <FaUser />
                      </Avatar>
                    </div>
                  </DropdownMenuItem>
                  <div className="h-px w-full bg-zinc-200" />
                  <DropdownMenuItem className="flex items-center justify-around">
                    <GoogleSignInBtn />
                    <div className="text-xl">
                      <AiOutlineGoogle />
                    </div>
                  </DropdownMenuItem>
                  <div className="h-px w-full bg-zinc-200" />

                  <DropdownMenuItem className="flex items-center justify-around">
                    <GitSignInBtn />
                    <div className="text-xl">
                      <AiFillGithub />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="h-8 w-px bg-zinc-200" />
              <Link href={"/auth/register"} className="text-sm text-gray-500">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5 p-3">
              <div className="text-orange-500">
                <SideCart user={user} />
              </div>
              <div>
                <NavbarLargeSrceenDropdown user={user} />
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
      <AdminSwitch />
    </nav>
  );
};

export default Navbar;
