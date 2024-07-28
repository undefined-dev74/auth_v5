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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthCard from "@/components/card/auth-card";

const authService = new AuthService();

const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

const Reset = () => {
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  const { setToastAlert } = useToast();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setTransition(() => {
      authService
        .sendResetPasswordLink(values)
        .then((res) => {
          setToastAlert("We have sent a new link to your email.", "success");
          router.push("/auth/new-password");
        })
        .catch((err) => {
          setError(err?.data?.message ?? "Something went wrong!");
          form.setError("email", { message: err?.data?.message });
        });
    });
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Email"
                    type="email"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Verify
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Are you facing any problems with receiving the code?{" "}
          <button
            onClick={() => form.handleSubmit(onSubmit)()}
            className="text-blue-400 hover:underline"
          >
            Resend code
          </button>
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
