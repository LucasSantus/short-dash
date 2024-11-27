import "next-auth";
import type { Account, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
    account: Account;
  }
}
