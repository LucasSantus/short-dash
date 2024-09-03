import { FORM_MAX_CHAR_LENGTH, FORM_MIN_CHAR_LENGTH } from "@/constants/form";
import { messages } from "@/constants/messages";
import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .email({
      message: messages.form.INSERT_VALID_EMAIL,
    }).trim(),
  password: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .min(8, {message: FORM_MIN_CHAR_LENGTH(8)})
      .max(50, FORM_MAX_CHAR_LENGTH(50))
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim()
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
