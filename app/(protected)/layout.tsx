import Navbar from "@/components/(Navbar)/Navbar";
import SettingNav from "./_components/SettingNav";
import { Toaster } from "@/components/ui/sonner";

interface ProtecteLayoutProps {
  children: React.ReactNode;
}

const ProtecteLayout = ({ children }: ProtecteLayoutProps) => {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-[#f3f7f4]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-0 h-[420px] w-[420px] rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-[-8%] top-[12%] h-[380px] w-[380px] rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-[320px] w-[320px] rounded-full bg-amber-100 blur-3xl" />
      </div>
      <SettingNav />
      <div className="relative z-10 flex w-full flex-1 flex-col">{children}</div>
    </div>
  );
};

export default ProtecteLayout;
