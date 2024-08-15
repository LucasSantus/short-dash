import { authOptions } from "@/lib/auth";
import { getServerSession, User } from "next-auth";

type UserServerResponse = {
  user: null,
  isAuthenticated: false
} | {
  user: User,
  isAuthenticated: true
}

export async function getUserServer(): Promise<UserServerResponse> {
  const session = await getServerSession(authOptions);

  if(!session || session.user) return {
    user: null,
    isAuthenticated: false
  }

  return { user: session.user, isAuthenticated: true }
}