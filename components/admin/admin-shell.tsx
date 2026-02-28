import { ReactNode } from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";

interface AdminShellProps {
  children: ReactNode;
  className?: string;
}

const AdminShell = ({ children, className }: AdminShellProps) => {
  return (
    <MaxWidthWrapper
      className={cn(
        "relative z-10 flex w-full flex-col gap-6 px-4 pb-16 pt-6 md:px-8 md:pt-10",
        className,
      )}
    >
      {children}
    </MaxWidthWrapper>
  );
};

export default AdminShell;
