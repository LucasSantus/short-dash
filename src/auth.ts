import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { messages } from "./constants/messages";
import { env } from "./env";
import { prismaClient } from "./lib/prisma";
import { signInFormSchema } from "./validation/auth/sign-in";

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prismaClient) as Adapter,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = await signInFormSchema.parseAsync(credentials);

        const user = await prismaClient.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("User not found.");
        }

        if (user.deletedAt) throw new Error("Este usuário foi deletado!");

        const account = await prismaClient.account.findFirst({
          where: {
            userId: user.id,
          },
        });

        if (!account) throw new Error(messages.account.ACCOUNT_NOT_FOUND);

        if (!user.hashedPassword) throw new Error("Ocorreu um problema ao tentar recuperar a Conta!");

        const passwordMatch = compare(password, user.hashedPassword);

        if (!passwordMatch) throw new Error("A Senha informada está incorreta!");

        const userData = {
          name: user.name,
          email: user.email,
          id: user.id,
        };

        return userData;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
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
