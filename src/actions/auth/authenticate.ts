"use server";

import { signIn } from "@/auth";
import { messages } from "@/constants/messages";
import { CredentialsAccountNotFoundError } from "@/errors/auth/credentials-account-not-found";
import { CredentialsPasswordNotFoundError } from "@/errors/auth/credentials-password-not-found-error";
import { CredentialsPasswordNotIsValidError } from "@/errors/auth/credentials-password-not-is-valid-error";
import { CredentialsUserDeactivateError } from "@/errors/auth/credentials-user-deleted";
import { CredentialsUserNotFoundError } from "@/errors/auth/credentials-user-not-found";

interface LoginVariables {
  email: string;
  password: string;
}

export async function logIn({ email, password }: LoginVariables) {
  const data = {
    email,
    password,
    redirect: false,
  };

  try {
    await signIn("credentials", data);
  } catch (error) {
    console.error({ error });

    let errorMessage = "Credenciais inválidas!";

    if (error instanceof CredentialsUserNotFoundError) {
      errorMessage = messages.globals.user.notFound;
    }
    if (error instanceof CredentialsUserDeactivateError) {
      errorMessage = messages.globals.user.deactivate;
    }
    if (error instanceof CredentialsAccountNotFoundError) {
      errorMessage = messages.globals.account.notFound;
    }
    if (error instanceof CredentialsPasswordNotFoundError) {
      errorMessage = "Ocorreu um problema ao tentar recuperar a conta do usuário!";
    }
    if (error instanceof CredentialsPasswordNotIsValidError) {
      errorMessage = "A Senha informada está incorreta!";
    }

    throw new Error(errorMessage);
  }
}
