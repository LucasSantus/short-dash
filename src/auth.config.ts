import { compare } from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import { env } from "./env";
import { CredentialsAccountNotFoundError } from "./errors/auth/credentials-account-not-found";
import { CredentialsPasswordNotFoundError } from "./errors/auth/credentials-password-not-found-error";
import { CredentialsPasswordNotIsValidError } from "./errors/auth/credentials-password-not-is-valid-error";
import { CredentialsUserDeactivateError } from "./errors/auth/credentials-user-deleted";
import { CredentialsUserNotFoundError } from "./errors/auth/credentials-user-not-found";
import { prismaClient } from "./lib/prisma";
import { signInFormSchema } from "./validation/auth/sign-in";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      from: env.RESEND_TO_EMAIL,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = await signInFormSchema.parseAsync(credentials);

        const user = await prismaClient.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) throw new CredentialsUserNotFoundError();

        if (user.deletedAt) throw new CredentialsUserDeactivateError();

        const account = await prismaClient.account.findFirst({
          where: {
            userId: user.id,
            provider: "credentials",
          },
        });

        if (!account) throw new CredentialsAccountNotFoundError();

        if (!user.password)
          throw new CredentialsPasswordNotFoundError("Ocorreu um problema ao tentar recuperar a conta do usuário!");

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) throw new CredentialsPasswordNotIsValidError();

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
};
