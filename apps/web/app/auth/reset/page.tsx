"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import useToast from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthCard from "@/components/card/auth-card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const authService = new AuthService();

const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

const Reset = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    try {
      await authService.sendResetPasswordLink(values);
      setSuccess(
        "An email has been sent to your email address. Please check your inbox and follow the instructions to reset your password."
      );
    } catch (error: Error | any) {
      setError(error?.message ?? "Something went wrong!");
      form.setError("email", { message: error?.message });
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
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-gray-400 text-center text-sm">
          Enter your email to reset your password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormError message={error} />
          <FormSuccess message={success} />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="john.doe@me.com"
                    type="email"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Are you facing any problems with receiving the code?{" "}
          <Button
          variant="link"
          disabled={form.formState.isValid}
            onClick={() => form.handleSubmit(onSubmit)()}
            className="text-blue-400 hover:underline"
          >
            Resend code
          </Button>
        </p>
      </div>
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

export default Reset;
