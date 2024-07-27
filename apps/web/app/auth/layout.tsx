"use client";
import { ReactNode } from "react";

// import Logo from '~/components/Logo';
import AuthFooter from "@/components/auth/auth-footer";

import AuthBackground from "./auth-background";
import Logo from "@/components/core/logo";
import { usePathname } from "next/navigation";

type AuthLayoutProps = {
  children?: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const path = usePathname()
  console.log(path)
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Background pattern */}
      <AuthBackground />

      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <Logo />
      </div>

      {/* Main content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md z-10">
          {children}
          <div className="py-6">
            <AuthFooter />
          </div>
        </div>
      </div>

      {/* "Create an account" link */}
      <div className="absolute top-10 right-10 z-20 bg-gray-750 px-8 py-4 text-sm text-gray-400 text-center">
        {path === "/auth/register"
          ? "Already have an account?"
          : "New to streamline?"}
        <a
          href={path === "/auth/login" ? "/auth/register" : "/auth/login"}
          className="text-primary hover:text-primary/80 hover:underline ml-1 font-bold"
        >
          {path === "/auth/login" ? "Create an account" : "Login"}
        </a>
      </div>
    </div>
  );};

export default AuthLayout;
