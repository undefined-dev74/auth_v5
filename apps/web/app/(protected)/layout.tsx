
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/context/store-context";

import { AppProvider } from "@/lib/app-provider";


import { auth } from "../api/auth/[...nextauth]";
import { AppLayout } from "@/layouts/app-layout/layout";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <AppProvider>
          <Toaster />
          <AppLayout>{children}</AppLayout>
        </AppProvider>
      </StoreProvider>
    </SessionProvider>
  );
};

export default ProtectedLayout;
