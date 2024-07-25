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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthService } from "@/services/auth.service";
import useToast from "@/hooks/use-toast";

const authService = new AuthService();

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { setToastAlert } = useToast();
  const token = searchParams.get("token") as string;

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      new_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");

    authService
      .resetPassword(token, values)
      .then((res) => {
        console.log(res);
        setToastAlert({
          type: "success",
          title: "Success!",
          message: "You have successfully reset your password.",
        });
        router.push("/auth/login");
      })
      .catch((err) => {
        console.log("error", err);
        setError(err.data?.message);
        form.setError("new_password", { message: err.data?.message });
      });
  };

  return (
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
                <FormLabel className="text-gray-500">New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
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
        <Button disabled={isPending} type="submit" className="w-full">
          Reset password
        </Button>
      </form>
    </Form>
  );
};
