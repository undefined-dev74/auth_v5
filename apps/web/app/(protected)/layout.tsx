import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/context/store-context";

import { AppProvider } from "@/lib/app-provider";
import { AppLayout } from "@/layouts/app-layout/layout";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  return (
    <StoreProvider>
      <AppProvider>
        <Toaster />
        <AppLayout>{children}</AppLayout>
      </AppProvider>
    </StoreProvider>
  );
};

export default ProtectedLayout;
