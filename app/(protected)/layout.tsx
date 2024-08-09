import Navbar from "@/components/(Navbar)/Navbar";
import SettingNav from "./_components/SettingNav";
import { Toaster } from "@/components/ui/sonner";

interface ProtecteLayoutProps {
  children: React.ReactNode;
}

const ProtecteLayout = ({ children }: ProtecteLayoutProps) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-y-10 bg-zinc-200">
      <SettingNav />

      {children}
    </div>
  );
};

export default ProtecteLayout;
