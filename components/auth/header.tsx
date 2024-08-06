import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <img src="/saladLogo.png" className="max-w-[100px]" alt="logo" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
