"use server";

import { LoginSchema } from "@/schema";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email sent!" };
};
