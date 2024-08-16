import { FORM_MAX_CHAR_LENGTH, FORM_MIN_CHAR_LENGTH } from "@/constants/form";
import { messages } from "@/constants/messages";
import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .min(1, "Insira o Nome!"),
  lastName: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .min(1, "Insira o Sobrenome!"),
  email: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .email({
      message: messages.form.INSERT_VALID_EMAIL,
    }),
  password: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .min(8, FORM_MIN_CHAR_LENGTH(8))
    .max(50, FORM_MAX_CHAR_LENGTH(50)),
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

// hashedPassword String
// role           String    @default("user")
// emailVerified  DateTime?
// image          String?
// authProviderId String?
// createdAt      DateTime  @default(now())
// updatedAt      DateTime  @default(now()) @updatedAt
// deletedAt      DateTime?
