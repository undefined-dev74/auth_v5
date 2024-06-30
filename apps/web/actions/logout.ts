"use server";

import { signOut } from "@/app/api/auth/[...nextauth]";

export const logout = async () => {
  await signOut();
};
