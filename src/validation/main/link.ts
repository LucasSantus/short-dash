import { messages } from "@/constants/messages";
import { z } from "zod";

export const linkSchema = z
  .object({
    title: z.string().min(1, messages.globals.form.requiredField).trim(),
    tags: z.string().trim().optional(),
    description: z.string({ message: messages.globals.form.requiredField }).optional(),

    code: z.string().min(1, messages.globals.form.requiredField).trim(),

    hasPassword: z.boolean(),
    hashedPassword: z.string().optional(),

    originalUrl: z.string({ message: messages.globals.form.requiredField }).url(messages.globals.data.mustBeUrlValid),
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
