"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkServerSession } from "@/actions/check-server-session";
import { setting } from "@/actions/setting";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { SettingSchema } from "@/schemas";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserRole } from "@prisma/client";
import { ExtenderUser } from "@/next-auth";
import { currentUser } from "@/lib/auth";
import { formatPrice } from "@/lib/formatPrice";

interface SettingFormProps {
  user: User;
}

const SettingformAdmin = ({ user }: SettingFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const route = useRouter();

  // useEffect(() => {
  //   (async () => {
  //     const user = await currentUser();
  //     if (user?.role !== "ADMIN") {
  //       route.push("/");
  //     }
  //   })();
  // }, []);

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    startTransition(() => {
      setError("");
      setSuccess("");
      setting(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Card className="w-[300px] sm:w-[850px]">
      <CardHeader>User Setting</CardHeader>
      <CardContent>
        <CardDescription>
          <section className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex items-center justify-start gap-3">
              <div>ID:</div>
              <div>{user.id}</div>
            </div>
            <div className="flex items-center gap-3">
              <div>Name:</div>
              <div>{user.name}</div>
            </div>
            <div className="flex items-center gap-3">
              <div>Email:</div>
              <div>{user.email}</div>
            </div>

            <div className="flex items-center gap-3">
              <div>Total Spend:</div>
              <div>{formatPrice(user.totalSpend)}</div>
            </div>
          </section>
        </CardDescription>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={true} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        hidden
                        type="password"
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        hidden
                        type="password"
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem
                    hidden
                    className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
                  >
                    <div className="space-y-0.5">
                      <FormLabel>Two Factor Authentication</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={true}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="flex justify-center">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingformAdmin;
