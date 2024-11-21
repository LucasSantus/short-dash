import { messages } from "@/constants/messages";
import { z } from "zod";

export const linkSchema = z
  .object({
    title: z.string().min(1, messages.form.REQUIRED_FIELD).trim(),
    tags: z.string().trim().optional(),
    description: z.string({ message: messages.form.REQUIRED_FIELD }).optional(),

    code: z.string().min(1, messages.form.REQUIRED_FIELD).trim(),

    hasPassword: z.boolean(),
    hashedPassword: z.string().optional(),

    originalUrl: z.string({ message: messages.form.REQUIRED_FIELD }).url(messages.form.MUST_BE_URL_VALID),
  })
  .refine(
    (data) => {
      if (data.hasPassword) {
        return !!data.hashedPassword;
      }

      return true;
    },
    {
      path: ["hashedPassword"],
      message: "O campo 'hashedPassword' é obrigatório quando 'hasPassword' é verdadeiro.",
    }
  );

export type LinkSchema = z.infer<typeof linkSchema>;
