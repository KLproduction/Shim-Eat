"use client";
import { signOutAction } from "@/actions/signOut";
import { Button } from "../ui/button";
import { CgLogOut } from "react-icons/cg";

const SignOutBtn = () => {
  const onClickHandler = async () => {
    await signOutAction();
  };

  return (
    <div className="flex items-center">
      <Button onClick={() => onClickHandler()} variant={"ghost"} size={"sm"}>
        <div className="mr-3 flex">Sign Out</div>
        <div className="text-lg">
          <CgLogOut />
        </div>
      </Button>
    </div>
  );
};

export default SignOutBtn;
