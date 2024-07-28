"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthFooter = () => {
  const pathname = usePathname();
  return (
    <p className="bg-gray-750 text-sm text-gray-400 text-center whitespace-pre-line">
      By {pathname === "/auth/register" ? "registering" : "signing"} in, you agree to our <br />
      <Link href="/terms" className="text-blue-400 hover:underline ml-1">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="text-blue-400 hover:underline">
        Privacy Policy
      </Link>
      .
    </p>
  );
};

export default AuthFooter;
