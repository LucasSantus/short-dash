"use server";

import { signIn } from "@/auth";
import { messages } from "@/constants/messages";
import { CredentialsAccountNotFoundError } from "@/errors/auth/credentials-account-not-found";
import { CredentialsPasswordNotFoundError } from "@/errors/auth/credentials-password-not-found-error";
import { CredentialsPasswordNotIsValidError } from "@/errors/auth/credentials-password-not-is-valid-error";
import { CredentialsUserDeletedError } from "@/errors/auth/credentials-user-deleted";
import { CredentialsUserNotFoundError } from "@/errors/auth/credentials-user-not-found";

interface Authenticate {
  email: string;
  password: string;
}

export async function authenticate(data: Authenticate) {
  try {
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof CredentialsUserNotFoundError) {
      throw new Error(messages.globals.user.notFound);
    }
    if (error instanceof CredentialsUserDeletedError) {
      throw new Error(messages.globals.user.deleted);
    }
    if (error instanceof CredentialsAccountNotFoundError) {
      throw new Error(messages.globals.account.notFound);
    }
    if (error instanceof CredentialsPasswordNotFoundError) {
      throw new Error("Ocorreu um problema ao tentar recuperar a conta do usuário!");
    }
    if (error instanceof CredentialsPasswordNotIsValidError) {
      throw new Error("A Senha informada está incorreta!");
    }
  }
}
