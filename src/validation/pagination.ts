import { z } from "zod";

export const pagination = z
  .object({
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
  })
  .optional();
