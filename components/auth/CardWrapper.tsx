"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Social } from "./Social";
import { Header } from "./header";
import { useSignInModel, useSignUpModel } from "@/hooks/modals";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial?: boolean;
  noShadowOrBorder?: boolean; // new prop
}

export const CardWapper = ({
  children,
  headerLabel,
  backBtnLabel,
  backBtnHref,
  showSocial,
  noShadowOrBorder = false,
}: CardWrapperProps) => {
  // Optional: Use useSignUpModel if backBtnLabel is provided and equals a specific value (e.g., 'Sign up')
  let handleBackBtnClick = undefined;
  if (backBtnLabel && backBtnLabel.toLowerCase().includes("sign up")) {
    try {
      const { open } = useSignUpModel();
      const { close } = useSignInModel();
      handleBackBtnClick = (e: React.MouseEvent) => {
        e.preventDefault();
        close();
        open();
      };
    } catch {}
  }
  if (backBtnLabel && backBtnLabel.toLowerCase().includes("sign in")) {
    try {
      const { open } = useSignInModel();
      const { close } = useSignUpModel();
      handleBackBtnClick = (e: React.MouseEvent) => {
        e.preventDefault();
        close();
        open();
      };
    } catch {}
  }

  return (
    <Card
      className={`w-[400px] ${
        noShadowOrBorder ? "border-none shadow-none" : "shadow-md"
      } `}
    >
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social></Social>
        </CardFooter>
      )}
      <div className="flex items-center justify-center">
        <Link
          className="p-5 pb-16 text-sm"
          href={backBtnHref}
          onClick={handleBackBtnClick}
        >
          {backBtnLabel}
        </Link>
      </div>
    </Card>
  );
};
