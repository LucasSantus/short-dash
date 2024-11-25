import { messages } from "@/constants/messages";
import { z } from "zod";

export const forgetPasswordFormSchema = z.object({
  email: z
    .string({
      required_error: messages.globals.form.requiredField,
    })
    .email({
      message: messages.globals.email.validEmail,
    }),
});

export type ForgetPasswordFormData = z.infer<typeof forgetPasswordFormSchema>;
