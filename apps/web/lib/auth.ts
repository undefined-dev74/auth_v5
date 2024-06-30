import { auth } from "@/app/api/auth/[...nextauth]";

export const currentUser = async () => {
  const session = await auth();
  console.log(session);
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
