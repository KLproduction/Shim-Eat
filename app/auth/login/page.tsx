"use client";

import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { currentUser } from "@/lib/auth";
import { ExtenderUser } from "@/next-auth";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const loginPage = () => {
  const [user, setUser] = useState<ExtenderUser>();
  const [count, setCount] = useState(0);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      const data = await currentUser();
      if (user?.id) {
        setUser(data);
        setCount((p) => p + 1);
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      route.push("/");
    }
  }, [count]);

  const callbackURL = sessionStorage.getItem("preLoginUrl") || null;

  return (
    <>
      <LoginForm />
    </>
  );
};

export default loginPage;
