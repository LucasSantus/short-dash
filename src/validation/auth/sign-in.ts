import { messages } from "@/constants/messages";
import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string({
      required_error: messages.globals.form.requiredField,
    })
    .email({
      message: messages.globals.email.validEmail,
    }),
  password: z
    .string({
      required_error: messages.globals.form.requiredField,
    })
    .min(1, "Insira a senha!"),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
