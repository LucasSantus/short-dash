import session from "@/lib/auth";
import type { Account, User } from "next-auth";
import { cache } from "react";

export type ServerAuthSession =
  | {
      user: User;
      account: Account;
      isAuthenticated: true;
    }
  | {
      user: null;
      account: null;
      isAuthenticated: false;
    };

export const getServerAuthSession = cache(async (): Promise<ServerAuthSession> => {
  const data = await session();

  if (!data)
    return {
      user: null,
      account: null,
      isAuthenticated: false,
    };

  return {
    user: data.user,
    account: data.account,
    isAuthenticated: true,
  };
});
