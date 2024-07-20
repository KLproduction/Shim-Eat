import Navbar from "@/components/Navbar";
import SettingNav from "./_components/SettingNav";
import { Toaster } from "@/components/ui/sonner";

interface ProtecteLayoutProps {
  children: React.ReactNode;
}

const ProtecteLayout = ({ children }: ProtecteLayoutProps) => {
  return (
    <div className=" min-h-dvh w-full flex flex-col gap-y-10 items-center justify-center bg-zinc-200">
      <SettingNav />
      <Toaster />
      {children}
    </div>
  );
};

export default ProtecteLayout;
