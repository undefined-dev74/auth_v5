"use client";

import { useRouter } from "next/navigation";

// services
import { AuthService } from "@/services/auth.service";
// hooks
import useToast from "@/hooks/use-toast";
// layouts
import DefaultLayout from "@/layouts/default-layout";
import { Button } from "@/components/ui/button";
// ui

// services
const authService = new AuthService();

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorPageProps) => {
  const router = useRouter();

  const { setToastAlert } = useToast();

  const handleSignOut = async () => {
    await authService
      .signOut()
      .catch(() =>
        setToastAlert({
          type: "error",
          title: "Error!",
          message: "Failed to sign out. Please try again.",
        })
      )
      .finally(() => router.push("/"));
  };

  return (
    <DefaultLayout>
      <div className="grid h-full place-items-center p-4">
        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <h3 className="text-slate-300 text-lg font-semibold">
              Exception Detected!
            </h3>
            <p className="mx-auto w-1/2 text-sm text-slate-300">
              We{"'"}re Sorry! An exception has been detected, and our
              engineering team has been notified. We apologize for any
              inconvenience this may have caused. Please reach out to our
              engineering team at{" "}
              <a href="mailto:support@plane.so" className="text-purple-500">
                support@plane.so
              </a>{" "}
              or on our{" "}
              <a
                href="https://discord.com/invite/A92xrEGCge"
                target="_blank"
                className="text-purple-500"
                rel="noopener noreferrer"
              />
              Discord server for further assistance.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button variant="default" size="lg" onClick={() => reset()}>
              Try again
            </Button>
            <Button variant="secondary" size="lg" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Error;
