"use client";

import { useSignUpModel } from "@/hooks/modals";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const GlobalSignUpBtn = (props: Props) => {
  const { open } = useSignUpModel();
  return (
    <div>
      <Button onClick={open}>Sign Up</Button>
    </div>
  );
};

export default GlobalSignUpBtn;
