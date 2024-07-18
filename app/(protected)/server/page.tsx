import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/UserInfo";

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <>
      <UserInfo user={user} label="Server componet" />
    </>
  );
};

export default ServerPage;
