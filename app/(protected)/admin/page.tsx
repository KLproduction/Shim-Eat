"use client";
import { RoleGate } from "@/components/auth/rolegate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const Adminpage = () => {
  const onApirouteClick = () => {
    fetch("/api/admin").then((res) => {
      console.log("API Response:", res);
      if (res.ok) {
        toast.success("Alolowed APO Route!");
      } else {
        toast.error("Forbidden API");
      }
    });
  };

  const onServerAdminActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
      }
    });
  };

  return (
    <Card className=" w-[600px]">
      <CardHeader>
        <p className=" text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="mt-3 flex gap-3 items-center justify-between rounded-lg border p-3 shadow-md">
          <p className=" text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApirouteClick}>Click to test</Button>
        </div>
        <div className="mt-3 flex gap-3 items-center justify-between rounded-lg border p-3 shadow-md">
          <p className=" text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerAdminActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Adminpage;
