import { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AdminSectionCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const AdminSectionCard = ({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: AdminSectionCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-[28px] border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.4)] backdrop-blur",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl text-slate-950">{title}</CardTitle>
          {description ? (
            <p className="text-sm leading-6 text-slate-500">{description}</p>
          ) : null}
        </div>
        {action}
      </CardHeader>
      <CardContent className={cn("pt-0", contentClassName)}>{children}</CardContent>
    </Card>
  );
};

export default AdminSectionCard;
