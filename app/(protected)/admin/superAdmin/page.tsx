"use client";

import { createAllProducts } from "@/actions/createAllProduct";
import { deleteAllProduct } from "@/actions/deleteAllProducts";
import { deleteAlluserOrder } from "@/actions/deleteAlluserOrder";
import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminSectionCard from "@/components/admin/admin-section-card";
import AdminShell from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { generateDummyUserOrderToDB } from "@/data/generateDummyUserOrderToDB";
import { generateDummyUserToDB } from "@/data/generateDummyUserToDB";
import { currentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { DatabaseZap, ShieldAlert } from "lucide-react";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

const SuperAdminPage = () => {
  const [pending, startTransition] = useTransition();
  const route = useRouter();
  useEffect(() => {
    (async () => {
      const user = await currentUser();
      if (!user?.isSuperAdmin) {
        route.push("/admin");
      }
    })();
  }, [route]);

  const generateDummyOrder = () => {
    startTransition(async () => {
      await generateDummyUserOrderToDB().then((data) => {
        if (data?.message) {
          toast.success(data.message);
        }
      });
    });
  };
  const createProudct = () => {
    startTransition(async () => {
      await createAllProducts().then((data) => {
        if (data?.message) {
          toast.success(data.message);
        }
      });
    });
  };
  const deleteProudct = () => {
    startTransition(async () => {
      await deleteAllProduct().then((data) => {
        if (data?.message) {
          toast.success(data.message);
        }
      });
    });
  };
  const deleteUserOrder = () => {
    startTransition(async () => {
      await deleteAlluserOrder().then((data) => {
        if (data?.message) {
          toast.success(data.message);
        }
      });
    });
  };
  const createUser = () => {
    startTransition(async () => {
      await generateDummyUserToDB().then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        toast.success(data.success);
      });
    });
  };
  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Restricted"
        title="Super admin controls"
        description="High-impact maintenance actions live here. These controls mutate core datasets and should be used deliberately."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <AdminSectionCard
          title="Seed and refresh"
          description="Populate the workspace for testing and internal demos."
          action={<DatabaseZap className="h-5 w-5 text-emerald-600" />}
        >
          <div className="grid gap-3">
            <Button
              onClick={() => generateDummyOrder()}
              disabled={pending}
              className="h-11 justify-start rounded-2xl bg-slate-950 px-5 text-white hover:bg-slate-950/90"
            >
              Create dummy orders
            </Button>
            <Button
              onClick={() => createProudct()}
              disabled={pending}
              className="h-11 justify-start rounded-2xl bg-slate-950 px-5 text-white hover:bg-slate-950/90"
            >
              Re-generate product list
            </Button>
            <Button
              onClick={() => createUser()}
              disabled={pending}
              className="h-11 justify-start rounded-2xl bg-slate-950 px-5 text-white hover:bg-slate-950/90"
            >
              Create dummy user
            </Button>
          </div>
        </AdminSectionCard>
        <AdminSectionCard
          title="Destructive actions"
          description="Use only when you explicitly want to clear live records."
          action={<ShieldAlert className="h-5 w-5 text-rose-600" />}
        >
          <div className="grid gap-3">
            <Button
              variant={"destructive"}
              onClick={() => deleteProudct()}
              disabled={pending}
              className="h-11 justify-start rounded-2xl px-5"
            >
              Delete all products
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => deleteUserOrder()}
              disabled={pending}
              className="h-11 justify-start rounded-2xl px-5"
            >
              Delete all user orders
            </Button>
          </div>
        </AdminSectionCard>
      </div>
    </AdminShell>
  );
};

export default SuperAdminPage;
