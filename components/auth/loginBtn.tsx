"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "./LoginForm";
import { useRef } from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButtonProps = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const ref = useRef();
  const route = useRouter();
  const onClick = () => {
    route.push("/auth/login");
  };
  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className=" p-0 w-auto bg-white bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <span onClick={onClick} className=" cursor-pointer m-0 p-0">
        {children}
      </span>
    );
  }
};
