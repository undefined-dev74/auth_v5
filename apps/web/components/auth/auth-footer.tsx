"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

const AuthFooter = () => {



  return (
    <div className="bg-gray-750 px-8 py-4 text-sm text-gray-400 text-center">
      By signing in, you agree to our
      <a href="/terms" className="text-blue-400 hover:underline ml-1">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="/privacy" className="text-blue-400 hover:underline">
        Privacy Policy
      </a>
      .
    </div>
  );
};

export default AuthFooter;
