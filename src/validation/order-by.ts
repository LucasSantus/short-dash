import { z } from "zod";

export const orderBy = z.enum(["desc", "asc"]).optional();
