"use client";

import { useSignInModel } from "@/hooks/modals";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const GlobalSignInBtn = (props: Props) => {
  const { open } = useSignInModel();
  return (
    <div>
      <Button onClick={open}>Sign In</Button>
    </div>
  );
};

export default GlobalSignInBtn;
