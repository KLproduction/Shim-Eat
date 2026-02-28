import { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AdminStatCardProps {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
  tone?: "default" | "success" | "warning";
}

const toneClasses = {
  default:
    "from-slate-950/[0.02] via-white to-white text-slate-950 ring-slate-950/5",
  success:
    "from-emerald-500/10 via-white to-white text-slate-950 ring-emerald-500/10",
  warning:
    "from-amber-500/10 via-white to-white text-slate-950 ring-amber-500/10",
};

const iconToneClasses = {
  default: "bg-slate-950 text-white",
  success: "bg-emerald-600 text-white",
  warning: "bg-amber-500 text-slate-950",
};

const AdminStatCard = ({
  label,
  value,
  helper,
  icon,
  tone = "default",
}: AdminStatCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-[24px] border-white/70 bg-gradient-to-br shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] ring-1",
        toneClasses[tone],
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        {icon ? (
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm",
              iconToneClasses[tone],
            )}
          >
            {icon}
          </div>
        ) : null}
      </CardHeader>
      {helper ? (
        <CardContent className="pt-0 text-sm text-slate-500">{helper}</CardContent>
      ) : null}
    </Card>
  );
};

export default AdminStatCard;
