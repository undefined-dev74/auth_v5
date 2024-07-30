"use client";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthService } from "@/services/auth.service";
import { OAuthOptions } from "@/components/auth/oauth-options";
import AuthCard from "@/components/card/auth-card";
import { strengthColor, strengthIndicator } from "@/utils/password-strength";
import { cn } from "@/lib/utils";

const authService = new AuthService();

const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "name is required" }),
});

const RegisterPage = () => {
  
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [level, setLevel] = useState<Record<string, any>>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = form;

  const changePassword = (value: any) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    try {
      await authService.emailSignUp(values)
      
    } catch (error) {
      
    }
  };

  return (
    <AuthCard title="Sign up or Log In">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="John Doe"
                      type="name"
                      className="bg-gray-700 text-white border-gray-600"
                      hasError={Boolean(errors.name)}
                      errorMessage={errors.email?.message ?? ""}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
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
                      placeholder="john.deo@example.com"
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
                      placeholder="Enter your password"
                      onChange={(e) => {
                        field.onChange(e);
                        changePassword(e.target.value);
                      }}
                      type="password"
                      className="bg-gray-700 text-white border-gray-600"
                      hasError={Boolean(errors.password)}
                      errorMessage={errors.password?.message ?? ""}
                    />
                  </FormControl>
                  {form.watch("password") && (
                    <div className="w-full mt-8">
                      <div className="flex items-center space-x-4">
                        <div
                          className={cn(
                            `h-2 w-[85px] rounded-md`,
                            level?.color
                          )}
                        />
                        <p className="text-sm text-gray-200 font-medium">
                          {level?.label}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={!isValid}
            type="submit"
            className={cn(
              "w-full bg-violet-500 text-neutral-50 p-2 rounded-lg hover:bg-violet-400 ",
              {
                "cursor-not-allowed": !isValid,
              }
            )}
          >
            Create an account
          </Button>
        </form>
        <OAuthOptions />
      </Form>
    </AuthCard>
  );
};

export default RegisterPage;
