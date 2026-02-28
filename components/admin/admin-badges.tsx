import {
  DeliveryStatus,
  OrderStatus,
  ProductStatus,
  UserRole,
} from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const badgeClassName =
  "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]";

export const OrderStatusBadge = ({
  status,
}: {
  status?: OrderStatus | null;
}) => {
  const styles = {
    PENDING: "border-amber-200 bg-amber-50 text-amber-700",
    PAID: "border-emerald-200 bg-emerald-50 text-emerald-700",
    COMPLETE: "border-sky-200 bg-sky-50 text-sky-700",
    CANCELLED: "border-rose-200 bg-rose-50 text-rose-700",
  };

  const resolvedStatus = status ?? "PENDING";

  return (
    <Badge
      className={cn(badgeClassName, styles[resolvedStatus])}
      variant="outline"
    >
      {status ?? "UNKNOWN"}
    </Badge>
  );
};

export const DeliveryStatusBadge = ({
  status,
}: {
  status?: DeliveryStatus | null;
}) => {
  const styles = {
    PREPARING: "border-slate-200 bg-slate-100 text-slate-700",
    DISPATCHED: "border-orange-200 bg-orange-50 text-orange-700",
    DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  const resolvedStatus = status ?? "PREPARING";

  return (
    <Badge
      className={cn(badgeClassName, styles[resolvedStatus])}
      variant="outline"
    >
      {status ?? "UNKNOWN"}
    </Badge>
  );
};

export const ProductStatusBadge = ({ status }: { status: ProductStatus }) => {
  const label = status === "onSale" ? "ON SALE" : "NOT AVAILABLE";
  const style =
    status === "onSale"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-rose-200 bg-rose-50 text-rose-700";

  return (
    <Badge className={cn(badgeClassName, style)} variant="outline">
      {label}
    </Badge>
  );
};

export const UserRoleBadge = ({ role }: { role: UserRole }) => {
  const style =
    role === "ADMIN"
      ? "border-violet-200 bg-violet-50 text-violet-700"
      : "border-slate-200 bg-slate-100 text-slate-700";

  return (
    <Badge className={cn(badgeClassName, style)} variant="outline">
      {role}
    </Badge>
  );
};
