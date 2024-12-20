"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AuthService } from "@/services/auth.service";
import useToast from "@/hooks/use-toast";
import { OAuthOptions } from "@/components/auth/oauth-options";
import { CheckCircle, CircleCheck } from "lucide-react";
import AuthCard from "@/components/card/auth-card";
import useSignInRedirection from "@/hooks/use-sign-in-redirection";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

const authService = new AuthService();

export default function AuthenticationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // sign in redirection hook
  const { handleRedirection } = useSignInRedirection();
  const { setToastAlert } = useToast();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = form;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    try {
      await authService.passwordSignIn(values);
      setToastAlert({
        type: "success",
        title: "Success!",
        message: "You have successfully logged in.",
      });
      router.refresh();
    } catch (err: any) {
      setToastAlert({
        type: "error",
        title: "Error!",
        message: err?.error ?? "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <AuthCard title="Login or Sign Up">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      ref={field.ref}
                      placeholder="john.doe@example.com"
                      type="email"
                      className="bg-gray-700 text-white border-gray-600"
                      hasError={Boolean(errors.email)}
                      errorMessage={errors.email?.message ?? ""}
                    />
                  </FormControl>

                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      ref={field.ref}
                      hasError={Boolean(errors.password)}
                      errorMessage={errors.password?.message ?? ""}
                      placeholder="Enter your password"
                      type="password"
                      className="bg-gray-700 text-white border-gray-600"
                    />
                  </FormControl>
                  <Button size="sm" variant="link" asChild className="px-0 font-normal text-primary">
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full disabled:cursor-not-allowed">
            {isSubmitting ? "Updating..." : "Continue"}
          </Button>
        </form>
        <OAuthOptions handleSignInRedirection={handleRedirection} />
      </Form>
    </AuthCard>
  );
}
