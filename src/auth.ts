import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { authConfig } from "./auth.config";
import { env } from "./env";
import { prismaClient } from "./lib/prisma";

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prismaClient) as Adapter,
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
    error: "/failed",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && !!session) {
        /**
         * Todos os campos que seram alterados devem ser passados aqui.
         * Exemplo:
         *  token.name = session?.name;
         *  token.email = session?.email;
         */
        token.name = session?.name;
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
        const { user } = token as {
          user: {
            id: string;
          };
        };

        session.user = { ...session.user, id: user.id };
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
  ...authConfig,
});
