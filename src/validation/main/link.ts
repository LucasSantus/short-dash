import { messages } from "@/constants/messages";
import { z } from "zod";

export const linkSchema = z.object({
  title: z.string().min(1, messages.globals.form.requiredField).trim(),
  tags: z.string().trim().optional(),
  description: z.string({ message: messages.globals.form.requiredField }).optional(),

  originalUrl: z.string({ message: messages.globals.form.requiredField }).url(messages.globals.data.mustBeUrlValid),
});

export type LinkSchema = z.infer<typeof linkSchema>;
