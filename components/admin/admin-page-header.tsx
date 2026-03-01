import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
}

const AdminPageHeader = ({
  eyebrow,
  title,
  description,
  actions,
  className,
}: AdminPageHeaderProps) => {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur xl:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">
              {eyebrow}
            </div>
          ) : null}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              {description}
            </p>
          </div>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
};

export default AdminPageHeader;
