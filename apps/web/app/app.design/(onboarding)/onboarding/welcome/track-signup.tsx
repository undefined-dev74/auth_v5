"use client";

import { useSession } from "next-auth/react";

import posthog from "posthog-js";
import { useEffect } from "react";

export default function TrackSignup() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      posthog.identify(session.user["id"], {
        email: session.user.email,
        name: session.user.name,
      });
      posthog.capture("user_signed_up");
    }
  }, [session?.user]);

  return null;
}
