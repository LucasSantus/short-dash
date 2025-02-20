import { FORM_MAX_CHAR_LENGTH, FORM_MIN_CHAR_LENGTH } from "@/constants/form";
import { messages } from "@/constants/messages";
import { z } from "zod";

export const resetPasswordFormSchema = z
  .object({
    email: z.string(),
    password: z
      .string({
        required_error: messages.globals.form.requiredField,
      })
      .min(8, FORM_MIN_CHAR_LENGTH(8))
      .max(50, FORM_MAX_CHAR_LENGTH(50)),
    confirmPassword: z
      .string({
        required_error: messages.globals.form.requiredField,
      })
      .min(8, FORM_MIN_CHAR_LENGTH(8))
      .max(50, FORM_MAX_CHAR_LENGTH(50)),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não se coincidem",
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;
