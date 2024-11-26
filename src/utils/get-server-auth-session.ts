import session from "@/lib/auth";
import type { User } from "next-auth";
import { cache } from "react";

export type ServerAuthSession =
  | {
      user: User;
      isAuthenticated: true;
    }
  | {
      user: null;
      isAuthenticated: false;
    };

export const getServerAuthSession = cache(async (): Promise<ServerAuthSession> => {
  const data = await session();

  if (!data)
    return {
      user: null,
      isAuthenticated: false,
    };

  return {
    user: data.user,
    isAuthenticated: true,
  };
});
