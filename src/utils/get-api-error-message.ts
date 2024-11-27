import { AuthError } from "next-auth";

export function getApiErrorMessage(error: unknown, defaultErrorMessage?: string): string {
  let errorMessage = defaultErrorMessage ?? "Ocorreu um erro inesperado!";

  if (error instanceof Error || error instanceof AuthError) {
    errorMessage = error.message;
  }

  console.error(errorMessage);

  return errorMessage;
}
