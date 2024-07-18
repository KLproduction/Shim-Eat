"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "@/components/UserInfo";

const ClientPage = () => {
  const user = useCurrentUser();

  return <UserInfo user={user} label="Client componet" />;
};

export default ClientPage;
