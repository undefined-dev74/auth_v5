"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import AuthCard from "@/components/card/auth-card";
import Link from "next/link";
import { AuthService } from "@/services/auth.service";

const authService = new AuthService();

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const verificationAttempted = useRef(false);
  const [verificationStatus, setVerificationStatus] = useState<{
    isLoading: boolean;
    error?: string;
    success?: string;
  }>({
    isLoading: true,
  });

  useEffect(() => {
    const verifyEmail = async () => {
      if (verificationAttempted.current) return;
      verificationAttempted.current = true;

      const token = searchParams.get("token");

      if (!token) {
        setVerificationStatus({
          isLoading: false,
          error: "Missing token!",
        });
        return;
      }

      try {
        const res = await authService.verifyEmail(token);
        setVerificationStatus({
          isLoading: false,
          success: res?.success || "Email verified successfully!",
        });
      } catch (error) {
        setVerificationStatus({
          isLoading: false,
          error: error.message || "An error occurred during verification.",
        });
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <AuthCard title="">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Email Verification
        </h2>
        <p className="text-gray-400 text-center text-sm">
          We're confirming your email verification.
        </p>
      </div>

      <div className="flex items-center justify-center my-8">
        {verificationStatus.isLoading && <BeatLoader color="#3B82F6" />}
        {!verificationStatus.isLoading && verificationStatus.success && (
          <div className="text-center">
            <FormSuccess message={verificationStatus.success} />
            <p className="text-green-400 mt-2 text-sm">
              Your email has been verified successfully!
            </p>
          </div>
        )}
        {!verificationStatus.isLoading && verificationStatus.error && (
          <div className="text-center">
            <FormError message={verificationStatus.error} />
            <p className="text-red-400 mt-2 text-sm">
              There was an error verifying your email.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/auth/login"
          className="text-primary text-sm hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
};

export default NewVerificationForm;
