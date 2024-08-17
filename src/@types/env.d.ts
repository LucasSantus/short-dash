/* eslint-disable @typescript-eslint/no-empty-object-type */

import { envSchema } from "@/env";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
