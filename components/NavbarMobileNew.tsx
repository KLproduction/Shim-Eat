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
import {
  AiFillGoogleCircle,
  AiFillGithub,
  AiFillHome,
  AiFillSetting,
  AiFillBook,
} from "react-icons/ai";
import { CgLogIn, CgLogOut } from "react-icons/cg";
import SideCart from "./SideCart";
import { useEffect, useState } from "react";
import AdminSwtich from "./AdminSwitch";
import SignOutBtn from "./auth/SignOutBtn";
import GoogleSignInBtn from "./auth/GoogleSignInBtn";
import GitSignInBtn from "./auth/GitSignInBtn";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExtenderUser } from "@/next-auth";
import { AiOutlineGoogle } from "react-icons/ai";
import ShowUserCartFromDBSideTest from "./ShowUserCartFormDBSideTest";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { BsBagCheckFill } from "react-icons/bs";

const navListNoLogiin = [
  {
    label: <AiFillHome />,
    path: "/",
    className: "home",
  },
  {
    label: <AiFillBook />,
    path: "/menu",
    className: "menu",
  },
  {
    label: <CgLogIn />,
    path: "/auth/login",
    className: "login",
  },
];
const navListLogiin = [
  {
    label: <AiFillHome />,
    path: "/",
    className: "home",
  },
  {
    label: <AiFillBook />,
    path: "/menu",
    className: "menu",
  },
];

const NavbarMobileNew = async () => {
  const user = await currentUser();

  return (
    <nav className="fixed bottom-0 z-[9999] h-[40px] w-full border-t border-gray-200 bg-white/50 align-middle backdrop-blur-lg transition-all">
      {!user?.id ? (
        <div className="flex items-center justify-between px-4 text-lg">
          <ul className="flex flex-1 items-center justify-around gap-4 text-zinc-800">
            {navListNoLogiin.map(({ label, path, className }) => (
              <li
                key={path}
                className={cn("font-bold hover:text-orange-200", className)}
              >
                <Link href={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 text-lg">
          <ul className="mt-3 flex flex-1 items-center justify-around text-zinc-800">
            {navListLogiin.map(({ label, path, className }) => (
              <li
                key={path}
                className={cn("font-bold hover:text-green-500", className)}
              >
                <Link href={path}>{label}</Link>
              </li>
            ))}
            <SideCart />
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-green-500">
                <AiFillSetting />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-30 flex flex-col justify-center"
                align="center"
              >
                <DropdownMenuItem className="flex items-center justify-around gap-1 text-xs">
                  <Link href={"/order"} className="flex items-center gap-5">
                    <div>My Order</div>
                    <div>
                      <BsBagCheckFill />
                    </div>
                  </Link>
                </DropdownMenuItem>
                <div className="h-px w-full bg-zinc-200" />
                <DropdownMenuItem className="flex items-center justify-around text-xs">
                  <Link href={"/setting"} className="flex items-center gap-5">
                    <div>Setting</div>
                    <div>
                      <AiFillSetting />
                    </div>
                  </Link>
                </DropdownMenuItem>
                <div className="h-px w-full bg-zinc-200" />

                <DropdownMenuItem className="flex items-center justify-around">
                  <SignOutBtn />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarMobileNew;
