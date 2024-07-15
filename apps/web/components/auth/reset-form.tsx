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
import { ResetSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardWrapper from "./card-wrapper";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/use-toast";

const authService = new AuthService()

export const ResetForm = () => {
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter()
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const {setToastAlert} = useToast()

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
   authService.sendResetPasswordLink(values).then((res) => {
     setSuccess(res?.success) 
     setToastAlert({
       type: "success",
       title: "Success!",
       message: "We have sent a new link to your email.",
     });
     router.push("/auth/new-password")
     setError(res.error)
   }).catch((err) => {
     setError(err)
     setToastAlert({
       type: "error",
       title: "Error!",
       message: err,
     })
   })
  };
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.deo@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {}
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
