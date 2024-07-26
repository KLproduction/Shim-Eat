import { ExtenderUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtenderUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 font-mono text-xs">
            {user?.id}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">NAME</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 font-mono text-xs">
            {user?.name}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">EMAIL</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 font-mono text-xs">
            {user?.email}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ROLE</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 font-mono text-xs">
            {user?.role}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">TOW FACTOR AUTHENTICATION</p>
          <Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
