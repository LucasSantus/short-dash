import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
    } & DefaultSession["user"];
  }
}


// import "next-auth";
// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     role?: string;
//     image?: string;
//   }

//   interface Session {
//     user: User & DefaultSession["user"];
//   }
// }

// // The `JWT` interface can be found in the `next-auth/jwt` submodule
// import "next-auth/jwt";

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//     user?: User;
//   }
// }
