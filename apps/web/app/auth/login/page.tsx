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
import AuthCard from "@/components/card/auth-card";
import useSignInRedirection from "@/hooks/use-sign-in-redirection";
import { Eye, EyeOff } from "lucide-react";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
  formSuccess: z.string().optional(),
});

const authService = new AuthService();

export default function AuthenticationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";
  // sign in redirection hook
  const { handleRedirection } = useSignInRedirection();
  
    const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      formSuccess: "",
    },
  });

  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    setError,
    setValue,
    clearErrors,
  } = form;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    clearErrors("root");
    setValue("formSuccess", "");
    const { formSuccess, ...data } = values;

    try {
      await authService.passwordSignIn(data);
      // Set form-level success
      setValue("formSuccess", "You have successfully logged in.");
      router.push("/home");
    } catch (err: any) {
      setError("root", {
        type: "manual",
        message: err?.message ?? "Something went wrong. Please try again.",
      });
    }
  };

  // Get form-level error and success messages
  const formError = form.formState.errors.root?.message || urlError;
  const formSuccess = form.getValues("formSuccess");

  return (
    <AuthCard title="Login or Sign Up">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={formError} />
          <FormSuccess message={formSuccess} />
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
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        ref={field.ref}
                        hasError={Boolean(errors.password)}
                        errorMessage={errors.password?.message ?? ""}
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        className="bg-gray-700 text-white border-gray-600 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <Button size="sm" variant="link" asChild className="px-0 font-bold text-primary hover:no-underline">
                    <Link href="/auth/reset">Forgot your password?</Link>
                  </Button>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full disabled:cursor-not-allowed">
            {isSubmitting ? "Updating..." : "Continue"}
          </Button>
        </form>
        <OAuthOptions handleSignInRedirection={handleRedirection} />
      </Form>
    </AuthCard>
  );
}
