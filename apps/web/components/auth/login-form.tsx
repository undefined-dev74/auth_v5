"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
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
import { LoginSchema } from "@/schema";
import { AuthService } from "@/services/auth.service";
import useToast from "@/hooks/use-toast";

const authService = new AuthService();

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [isPending, setTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { setToastAlert } = useToast();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = async (values) => {
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
    } catch (err) {
      setToastAlert({
        type: "error",
        title: "Error!",
        message: err?.error ?? "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {showTwoFactor ? (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="123456"
                      className="bg-gray-700 text-white border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter your password"
                        type="password"
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal text-primary"
                    >
                      <Link href="/auth/reset">Forgot password?</Link>
                    </Button>
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button
          disabled={isPending}
          type="submit"
          className="w-full bg-violet-500 text-neutral-50 p-2 rounded-lg hover:bg-violet-400"
        >
          {showTwoFactor ? "Confirm" : "Continue"}
        </Button>
      </form>
      <div className="mt-4 text-center text-gray-500">or</div>
      <Button
        variant="outline"
        className="w-full mt-2 bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
        onClick={() => {
          /* Handle Google login */
        }}
      >
        <img src="/logo/google.svg" alt="Google" className="w-5 h-5 mr-2" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        className="w-full mt-2 bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
        onClick={() => {
          /* Handle GitHub login */
        }}
      >
        <img src="/logo/github.svg" alt="GitHub" className="w-5 h-5 mr-2" />
        Continue with GitHub
      </Button>
    </Form>
  );
};

export default LoginForm;
