import { checkStrength } from "@/components/input-password";
import { FORM_MIN_CHAR_LENGTH } from "@/constants/form";
import { messages } from "@/constants/messages";
import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string({
      required_error: messages.globals.form.requiredField,
    })
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .trim(),
  email: z
    .string({
      required_error: messages.globals.form.requiredField,
    })
    .email({
      message: messages.globals.email.validEmail,
    })
    .trim(),
  password: z
    .string({
      required_error: messages.globals.form.requiredField,
    })
    .min(8, { message: FORM_MIN_CHAR_LENGTH(8) })
    .refine(
      (password) => {
        const { score } = checkStrength(password);

        return score.length === 0;
      },
      () => ({
        message: `A Senha não atende os seguintes requisitos!`,
      })
    ),
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
