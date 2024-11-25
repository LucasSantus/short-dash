import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

export function getApiErrorMessage(error: unknown, defaultErrorMessage?: string): string {
  let errorMessage = defaultErrorMessage ?? "Ocorreu um erro inesperado!";

  if (error instanceof Error || error instanceof AuthError) {
    errorMessage = error.message;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P1001") {
      errorMessage = "Banco de dados Indisponível.";
    }
  }

  console.error(errorMessage);

  return errorMessage;
}
