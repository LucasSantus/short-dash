import { messages } from "@/constants/messages";
import { z } from "zod";

export const linkSchema = z.object({
  title: z.string({ message: messages.form.REQUIRED_FIELD }),
  description: z.string({ message: messages.form.REQUIRED_FIELD }).optional(),
  originalUrl: z.string({ message: messages.form.REQUIRED_FIELD }).url(messages.form.MUST_BE_URL_VALID),
});

export type LinkSchema = z.infer<typeof linkSchema>;
