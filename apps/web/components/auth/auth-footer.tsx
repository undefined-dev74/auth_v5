"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

const AuthFooter = () => {
  return (
    <p className="bg-gray-750 text-sm text-gray-400 text-center whitespace-pre-line">
      By signing in, you agree to our <br />
      <a href="/terms" className="text-blue-400 hover:underline ml-1">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="/privacy" className="text-blue-400 hover:underline">
        Privacy Policy
      </a>
      .
    </p>
  );
};

export default AuthFooter;
