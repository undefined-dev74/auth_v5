"use client";
import { ReactNode } from "react";

// import Logo from '~/components/Logo';
import AuthFooter from "@/components/auth/auth-footer";
import AuthCard from "@/components/card/auth-card";
import AuthBackground from "./auth-background";
import Logo from "@/components/core/logo";


type AuthLayoutProps = {
  children?: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="min-h-screen bg-gray-900 flex flex-col">
    {/* Background pattern */}
    <div
      className="absolute inset-0 bg-repeat opacity-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />

    {/* Logo */}
    <div className="absolute top-4 left-4 z-20">
      <Logo />
    </div>

    {/* Main content */}
    <div className="flex-grow flex justify-center items-center">
      <div className="w-full max-w-md z-10">
        <AuthCard>{children}</AuthCard>
        <AuthFooter />
      </div>
    </div>

    {/* "Create an account" link */}
    <div className="absolute top-4 right-4 z-20 bg-gray-750 px-8 py-4 text-sm text-gray-400 text-center">
      New to Streamline?
      <a
        href="/signup"
        className="text-primary hover:text-primary-foreground hover:underline ml-1 font-bold"
      >
        Create an account
      </a>
    </div>
  </div>
);

export default AuthLayout;
