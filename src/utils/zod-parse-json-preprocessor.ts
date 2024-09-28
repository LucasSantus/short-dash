import { z } from "zod";

export function zodParseJsonPreprocessor(value: unknown, context: z.RefinementCtx) {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      context.addIssue({
        code: "custom",
        message: (error as Error).message,
      });
    }
  }

  return value;
}
