import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

//adding type to seesion by extending the DefailtSession
export type ExtenderUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  isSuperAdmin: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtenderUser;
  }
}
