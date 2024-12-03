import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth, { Account } from "next-auth";
import type { Adapter } from "next-auth/adapters";
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

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prismaClient) as Adapter,
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
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
    error: "/failed",
  },
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (trigger === "update" && !!session) {
        /**
         * Todos os campos que seram alterados devem ser passados aqui.
         * Exemplo:
         *  token.name = session?.name;
         *  token.email = session?.email;
         */
        token.name = session?.name;
      }

      if (account) {
        token.account = account;
      }

      if (user)
        return {
          ...token,
          user,
        };

      return token;
    },

    async session({ session, user, trigger, token, newSession }) {
      if (token) {
        const { user, account } = token as {
          user: {
            id: string;
          };
          account: Account;
        };

        session.user = { ...session.user, id: user.id };
        session.account = account || null;
      } else if (trigger === "update") {
        /**
         * Todos os campos que seram alterados devem ser passados aqui.
         * Exemplo:
         *  session.user.name = newSession.name;
         *  session.user.email = newSession.email;
         */
        session.user.name = newSession.name;
      } else {
        session.user = {
          ...session.user,
          id: user.id,
        };
      }

      return session;
    },
  },
});
