export function getApiErrorMessage(error: unknown, defaultErrorMessage?: string): string {
  let errorMessage = defaultErrorMessage ?? "Ocorreu um erro inesperado!";

  if (error instanceof Error) {
    if (
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null &&
      "errors" in error.response &&
      Array.isArray(error.response.errors)
    ) {
      errorMessage =
        error.response.errors.at(0)?.extensions?.originalError?.message?.at(0)?.errors?.at(0) ||
        error.response.errors[0].message ||
        error.message;
    } else {
      errorMessage = error.message;
    }
  }

  return errorMessage;
}
