import { getSession } from "@/utils/get-session";
import { cache } from "react";

export const createTRPCContext = cache(async () => {
  const session = await getSession();

  return session;
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
