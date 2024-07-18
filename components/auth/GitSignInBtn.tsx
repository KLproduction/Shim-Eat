"use client";
import { Button } from "../ui/button";
import { gitSignIn } from "@/actions/socalSignInAction";

const GitSignInBtn = () => {
  return (
    <div>
      <Button onClick={() => gitSignIn()} variant={"ghost"} size={"sm"}>
        GitHub Sign In
      </Button>
    </div>
  );
};

export default GitSignInBtn;
