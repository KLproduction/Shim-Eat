"use client";

import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { currentUser } from "@/lib/auth";
import { ExtenderUser } from "@/next-auth";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [user, setUser] = useState<ExtenderUser | null>(null);
  const [count, setCount] = useState(0);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      const data = await currentUser();
      if (data?.id) {
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

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
