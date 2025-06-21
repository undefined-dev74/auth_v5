"use client";

import { PosthogPageview } from "@/ui/layout/posthog-pageview";

import {
  KeyboardShortcutProvider,
  TooltipProvider,
  useRemoveGAParams,
} from "@app/ui";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/_proxy/posthog/ingest",
    ui_host: "https://us.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true, // Enable pageleave capture
  });
}

export default function RootProviders({ children }: { children: ReactNode }) {
  useRemoveGAParams();

  return (
    <PostHogProvider client={posthog}>
      <TooltipProvider>
        <KeyboardShortcutProvider>
          <Toaster closeButton className="pointer-events-auto" />
          <PosthogPageview />
          {children}
        </KeyboardShortcutProvider>
      </TooltipProvider>
    </PostHogProvider>
  );
}
