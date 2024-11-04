import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthError } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { env } from "./env";
import { prismaClient } from "./lib/prisma";
import { signInFormSchema } from "./validation/auth/sign-in";

import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { messages } from "./constants/messages";

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prismaClient) as Adapter,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Resend({
      from: env.RESEND_TO_EMAIL,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = await signInFormSchema.parseAsync(credentials);

        // const userData = await signInAction({
        //   email,
        //   password,
        // });

        const user = await prismaClient.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) throw new AuthError("Usuário não encontrado!");

        if (user.deletedAt) throw new AuthError("Este usuário foi deletado!");

        const account = await prismaClient.account.findFirst({
          where: {
            userId: user.id,
          },
        });

        if (!account) throw new AuthError(messages.globals.account.notFound);

        if (!user.password) throw new AuthError("Ocorreu um problema ao tentar recuperar a Conta!");

        const isPasswordValid = await compare(password as string, user.password);

        if (!isPasswordValid) throw new AuthError("A Senha informada está incorreta!");

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
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user)
        return {
          ...token,
          user,
        };

      return token;
    },

    async session({ session, user, token }) {
      if (token) {
        const { user } = token as {
          user: {
            id: string;
          };
        };

        session.user = { ...session.user, id: user.id };
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
