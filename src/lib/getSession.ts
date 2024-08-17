import session from "@/lib/auth";
import { User } from "next-auth";

export type AuthSession =
  | {
      user: User;
      isAuthenticated: true;
    }
  | {
      user: null;
      isAuthenticated: false;
    };

export async function getSession(): Promise<AuthSession> {
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
}
