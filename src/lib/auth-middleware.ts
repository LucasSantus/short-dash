import { getSession } from "@/utils/get-session";
import { TRPCError } from "@trpc/server";
import { User } from "next-auth";
import { ZodSchema } from "zod";

interface AuthMiddlewareContext {
  user: User;
}

export interface AuthMiddleware<T, R> {
  input?: T;
  fn: (context: AuthMiddlewareContext) => Promise<R>;
}

export const authMiddleware = async <T, R>(
  { input, fn }: AuthMiddleware<T, R>,
  schema?: ZodSchema,
): Promise<R> => {
  try {
    const { isAuthenticated, user } = await getSession();

    if (!isAuthenticated) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });
    }

    if (!user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }

    if (schema && input) {
      const { success, error } = await schema.safeParse(input);

      if (success) {
        return fn({
          user,
        });
      } else {
        const errorMessage = error?.errors?.[0].message;

        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: errorMessage,
        });
      }
    }

    return fn({
      user,
    });
  } catch (error: unknown) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
