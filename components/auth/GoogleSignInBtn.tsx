"use client";
import { Button } from "../ui/button";
import { googleSignIn } from "@/actions/socalSignInAction";

const GoogleSignInBtn = () => {
  return (
    <div>
      <Button onClick={() => googleSignIn()} variant={"ghost"} size={"sm"}>
        Google Sign In
      </Button>
    </div>
  );
};

export default GoogleSignInBtn;
