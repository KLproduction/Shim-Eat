"use client";

import ResponsiveModel from "@/components/global/responsive-model";
import { useSignInModel } from "@/hooks/modals";
import { LoginForm } from "../auth/LoginForm";

type Props = {};

const SignInModel = (props: Props) => {
  const { isOpen, close } = useSignInModel();
  return (
    <div>
      <ResponsiveModel isOpen={isOpen} onOpenChange={close}>
        <div>
          <LoginForm noBackground={true} />
        </div>
      </ResponsiveModel>
    </div>
  );
};

export default SignInModel;
