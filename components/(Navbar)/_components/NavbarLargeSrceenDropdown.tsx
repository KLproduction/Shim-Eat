"use client";

import SignOutBtn from "@/components/auth/SignOutBtn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExtenderUser } from "@/next-auth";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

interface NavbarLargeSrceenDropdownProps {
  user: ExtenderUser;
}

const NavbarLargeSrceenDropdown = ({
  user,
}: NavbarLargeSrceenDropdownProps) => {
  const route = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={user?.image || ""}
              className="max-w-[50px] rounded-full ring-2 ring-orange-500"
            />
            <AvatarFallback className="bg-orange-300">
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-[9999] flex w-40 flex-col justify-center"
          align="center"
        >
          <DropdownMenuItem className="flex items-center justify-around">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => route.push("/order")}
              className="m-0 flex items-center gap-5"
            >
              <div>My Order</div>
              <div>
                <BsBagCheckFill />
              </div>
            </Button>
          </DropdownMenuItem>
          <div className="h-px w-full bg-zinc-200" />
          <DropdownMenuItem className="flex items-center justify-around">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => route.push("/setting")}
              className="flex items-center gap-5"
            >
              <div>Setting</div>
              <div>
                <AiFillSetting />
              </div>
            </Button>
          </DropdownMenuItem>
          <div className="h-px w-full bg-zinc-200" />

          <DropdownMenuItem className="flex items-center justify-around">
            <SignOutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarLargeSrceenDropdown;
