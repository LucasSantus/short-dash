import session from "@/lib/auth";
import { User } from "next-auth";

type Session =
  | {
      user: User;
      isAuthenticated: true;
    }
  | {
      user: null;
      isAuthenticated: false;
    };

export async function getSession(): Promise<Session> {
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
