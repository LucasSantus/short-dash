import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authSignInServer } from "./actions/auth/sign-in";
import { env } from "./env";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
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
        const emailCredentials = credentials.email as string | undefined;
        const passwordCredentials = credentials.password as string | undefined;

        if (!emailCredentials || !passwordCredentials) {
          throw new Error("Erro");
        }

        const user = await authSignInServer({
          email: emailCredentials,
          password: passwordCredentials,
        });

        if (!user) return null;

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user.id,
        };

        return userData;
      },
    }),
  ],
  // secret: "F(D*HFSD(*FH*AFG*SAFASDAISDJAS)",
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (!!user) {
        token.user = user;
      }

      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
