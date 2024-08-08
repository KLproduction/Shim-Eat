"use client";

import Link from "next/link";
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
import { startTransition, useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExtenderUser } from "@/next-auth";
import { AiOutlineGoogle } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { BsBagCheckFill } from "react-icons/bs";
import { redirect, usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutBtn from "@/components/auth/SignOutBtn";
import SideCart from "@/components/SideCart";
import { signOutonClickHandler } from "@/components/auth/SignoutOnClickHandler";
import { BiSolidUser } from "react-icons/bi";
import { Button } from "@/components/ui/button";

interface NavbarMobileComponentsProps {
  user: ExtenderUser;
}
interface ActiveStates {
  home: boolean | null;
  menu: boolean | null;
  profile: boolean | null;
  cart: boolean | null;
  login: boolean | null;
}

const NavbarMobileComponents = ({ user }: NavbarMobileComponentsProps) => {
  const route = useRouter();
  const [activeStates, setActiveStates] = useState<ActiveStates>({
    home: null,
    menu: null,
    profile: null,
    cart: null,
    login: null,
  });

  const handleSetActive = (activeKey: keyof ActiveStates | null) => {
    setActiveStates((prev) => ({
      ...Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {} as ActiveStates,
      ),
      [activeKey!]: true,
    }));
  };

  const [isCart, setIsCart] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const paths = [
      "/cart",
      "/checkout",
      "/stripe/purchase-success",
    ] as string[];
    const hideCart = paths.some((path) => pathname.includes(path));

    setIsCart(!hideCart);
  }, [pathname]);

  useEffect(() => {
    let activeKey: keyof ActiveStates | null = null;

    if (pathname === "/") {
      activeKey = "home";
    } else if (pathname.startsWith("/menu")) {
      activeKey = "menu";
    } else if (pathname.startsWith("/auth/login")) {
      activeKey = "login";
    } else if (
      pathname.startsWith("/setting") ||
      pathname.startsWith("/order")
    ) {
      activeKey = "profile";
    }

    handleSetActive(activeKey);
  }, [pathname]);

  const navList = [
    {
      label: <AiFillHome />,
      path: "/",
      className: `${activeStates.home ? " translate-y-[-10px] text-orange-500" : ""}`,
    },
    {
      label: <AiFillBook />,
      path: "/menu",
      className: `${activeStates.menu ? " translate-y-[-10px] text-orange-500" : ""}`,
    },
    {
      label: <CgLogIn />,
      path: "/auth/login",
      className: `${user ? "hidden" : "flex login"} ${activeStates.login ? "translate-y-[-10px]" : ""}`,
    },
  ];

  const signOut = () => {
    startTransition(async () => {
      await signOutonClickHandler();
    });
  };

  return (
    <nav className="fixed bottom-0 z-[9999] h-[40px] w-full border-t border-gray-200 bg-white/50 align-middle backdrop-blur-lg transition-all">
      {!user ? (
        <div className="mt-3 flex items-center justify-between px-4 text-lg">
          <ul className="flex flex-1 items-center justify-around text-lg text-zinc-800">
            {navList.map(({ label, path, className }) => (
              <li
                key={path}
                className={cn(
                  "font-bold transition-all hover:text-green-500",
                  className,
                )}
              >
                <Link href={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 text-lg">
          <ul
            className={cn(
              "mt-3 flex flex-1 items-center justify-around text-zinc-800 transition-all",
            )}
          >
            {navList.map(({ label, path, className }) => (
              <li
                key={path}
                className={cn("font-bold hover:text-green-500", className)}
              >
                <Link href={path}>{label}</Link>
              </li>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "hover:text-green-500",
                  activeStates.profile
                    ? "translate-y-[-10px] text-orange-500"
                    : "",
                )}
              >
                <BiSolidUser />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-30 flex flex-col justify-center pb-2"
                align="center"
              >
                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-around gap-5 text-xs"
                  onClick={() => {
                    route.push("/order");
                  }}
                >
                  My Order
                  <BsBagCheckFill />
                </DropdownMenuItem>
                <div className="h-px w-full bg-zinc-200" />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-around gap-5 text-xs"
                  onClick={() => {
                    route.push("/setting");
                  }}
                >
                  <div>Setting</div>
                  <div>
                    <AiFillSetting />
                  </div>
                </DropdownMenuItem>
                <div className="h-px w-full bg-zinc-200" />

                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-around gap-5 text-xs"
                  onClick={() => signOut()}
                >
                  <div>Sign Out</div>
                  <div>
                    <CgLogOut />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isCart && <SideCart user={user} />}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarMobileComponents;
