"use client";
import { signOutAction } from "@/actions/signOut";
import { Button } from "../ui/button";

const SignOutBtn = () => {
  const onClickHandler = async () => {
    await signOutAction();
  };

  return (
    <div className="m-0 p-0">
      <Button onClick={() => onClickHandler()} variant={"ghost"} size={"sm"}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutBtn;
