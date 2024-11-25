import { messages } from "@/constants/messages";
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string({
    required_error: messages.globals.form.requiredField,
  }),
  email: z
    .string({
      required_error: messages.globals.form.requiredField,
    })
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
