import { FORM_MIN_CHAR_LENGTH } from "@/constants/form";
import { messages } from "@/constants/messages";
import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .email({
      message: messages.form.INSERT_VALID_EMAIL,
    })
    .trim(),
  password: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .min(8, { message: FORM_MIN_CHAR_LENGTH(8) }),
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
