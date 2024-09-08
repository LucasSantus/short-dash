import { z } from "zod";

export const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    message: "Selecione um tema",
  }),
});

export type AppearanceFormData = z.infer<typeof appearanceFormSchema>;
