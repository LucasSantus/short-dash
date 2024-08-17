import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authSignInServer } from "./actions/auth/sign-in";
import { env } from "./env";

// type UserSessionData = NextAuthUser & {
//   id: string;
// };

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
          name: user.name ?? "",
          email: user.email,
          id: user.id,
        };

        return userData;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  // callbacks: {
  //   async jwt({ token, user, trigger, session }) {
  //     if (trigger === "update" && !!session) {
  //       token.name = session?.name;
  //     }

  //     if (user)
  //       return {
  //         ...token,
  //         user,
  //       };

  //     return token;
  //   },
  //   async session({ session, user, token, newSession, trigger }) {
  //     if (token) {
  //       session.user = {
  //         ...session.user,
  //         id: (token as any).user.id,
  //       };
  //     } else if (trigger === "update" && !!newSession) {
  //       session.user.name = newSession.name;
  //     } else {
  //       session.user = {
  //         ...session.user,
  //         id: user.id,
  //       };
  //     }

  //     return session;
  //   },

  // },
});
