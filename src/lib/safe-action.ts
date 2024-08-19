import { createSafeActionClient } from "next-safe-action";
import { getSession } from "./getSession";

export const protectedActionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return "Erro inesperado";
  },
  handleServerErrorLog(error) {
    console.error(error);
  },
}).use(async ({ next }) => {
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
});
