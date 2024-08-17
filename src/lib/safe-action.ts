import { createSafeActionClient } from "next-safe-action";
import { getSession } from "./getSession";

export const protectedActionClient = createSafeActionClient().use(
  async ({ next }) => {
    const { isAuthenticated, user } = await getSession();

    if (!isAuthenticated) {
      throw new Error("Session not found!");
    }

    if (!user) {
      throw new Error("User not found!");
    }

    return next({
      ctx: {
        user: user,
      },
    });
  },
);
