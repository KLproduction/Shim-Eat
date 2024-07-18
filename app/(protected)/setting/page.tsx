import { currentUser } from "@/lib/auth";

import Settingform from "@/components/auth/SettingForm";

const SettingPage = async () => {
  const user = await currentUser();

  return <div>{user && <Settingform user={user} />}</div>;
};

export default SettingPage;
