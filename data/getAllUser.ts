"use server";

import { db } from "@/lib/db";

export const getAllUser = async () => {
  const user = await db.user.findMany();

  return user;
};
