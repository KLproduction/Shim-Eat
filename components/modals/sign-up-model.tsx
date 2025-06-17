"use client";

import ResponsiveModel from "@/components/global/responsive-model";
import { useSignInModel, useSignUpModel } from "@/hooks/modals";
import { RegisterForm } from "../auth/RegisterForm";

type Props = {};

const SignUpModel = (props: Props) => {
  const { isOpen, close } = useSignUpModel();
  return (
    <div>
      <ResponsiveModel isOpen={isOpen} onOpenChange={close}>
        <div>
          <RegisterForm noBackground={true} />
        </div>
      </ResponsiveModel>
    </div>
  );
};

export default SignUpModel;
