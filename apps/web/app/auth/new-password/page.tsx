"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import useToast from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import AuthCard from "@/components/card/auth-card";
import { BeatLoader } from "react-spinners";
import Link from "next/link";

const authService = new AuthService();

const NewPasswordSchema = z.object({
  new_password: z.string().min(6, { message: "Minimum 6 characters required" }),
});

const NewPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  const { setToastAlert } = useToast();
  const token = searchParams.get("token") as string;

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      new_password: "",
    },
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    const verifyToken = async () => {
      setIsVerifying(true);
      if (!token) {
        setError("Missing token!");
        setIsTokenValid(false);
        setIsVerifying(false);
        return;
      }
      try {
        await authService.verifyResetToken(token);
        setIsTokenValid(true);
      } catch (error) {
        console.log(error);
        setIsTokenValid(false);
        setError(
          "Invalid or expired token. Please request a new password reset token."
        );
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    try {
      await authService.resetPassword(token, values);
      setToastAlert({
        type: "success",
        title: "Success!",
        message: "You have successfully reset your password.",
      });
      router.push("/auth/login");
    } catch (error: Error | any) {
      console.log("Error", error);
      setError(
        error?.message || "An error occurred while resetting your password."
      );
    }
  };

  return (
    <AuthCard title="">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Set New Password</h2>
        <p className="text-gray-400 text-center text-sm">
          Please enter your new password below.
        </p>
      </div>

      {isVerifying ? (
        <div className="flex flex-col items-center justify-center my-4">
          <BeatLoader color="#3B82F6" />
          <p className="text-gray-400 text-sm mt-2">Verifying token...</p>
        </div>
      ) : isTokenValid ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="new_password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="******"
                        type="password"
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? (
                <BeatLoader color="#ffffff" size={8} />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col justify-center">
          <FormError message={error} />
        </div>
      )}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Go Back
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default NewPassword;
