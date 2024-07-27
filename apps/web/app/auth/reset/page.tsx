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
import { useRouter } from "next/navigation";
import useToast from "@/hooks/use-toast";
import AuthCard from "@/components/card/auth-card";


const authService = new AuthService();

const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

const Reset = () => {
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const { setToastAlert } = useToast();

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    authService
      .sendResetPasswordLink(values)
      .then((res) => {
        console.log(res);
        setSuccess("We have sent a new link to your email.");
        router.push("/auth/new-password");
        setError(res.error);
      })
      .catch((err) => {
        console.log("error", err);
        setError(err.data?.message);
        form.setError("email", { message: err.data?.message });
      });
  };
  return (
    <AuthCard title="Forgot Password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.deo@example.com"
                      type="email"
                      className="bg-gray-700 text-white border-gray-600"
                      hasError={Boolean(fieldState.error?.message)}
                      errorMessage={fieldState.error?.message ?? ""}
                      hasSuccess={Boolean(success)}
                      helperText={success}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {}

          <Button disabled={isPending} type="submit" className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default Reset;
