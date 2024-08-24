import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { getSession } from "./get-session";

export const protectedActionClient = createSafeActionClient({
  handleReturnedServerError(error) {
    if (error instanceof Error) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
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
      user,
    },
  });
});
