"use server";

import { messages } from "@/constants/messages";
import { getSession } from "@/lib/getSession";
import { User } from "next-auth";
import { ZodSchema } from "zod";

interface AuthProtectedActionOptions<T> {
  schema: ZodSchema<T>;
  action: (user: User) => Promise<any>;
}

interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function authProtectedAction<T>({
  schema,
  action,
  input,
}: AuthProtectedActionOptions<T> & { input: T }): Promise<
  T | null | ValidationResult<T>
> {
  const { isAuthenticated, user } = await getSession();

  if (!isAuthenticated) {
    throw new Error("Você não está autenticado no sistema!");
  }

  if (!user) {
    throw new Error(messages.account.USER_NOT_FOUND);
  }

  const { success, error } = schema.safeParse(input);

  if (!success) {
    return {
      success: false,
      error: error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("; "),
    };
  }

  const result = await action(user);

  return result ?? null;
}
