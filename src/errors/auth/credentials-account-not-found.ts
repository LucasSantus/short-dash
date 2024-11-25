import { messages } from "@/constants/messages";
import { AuthError } from "next-auth";

export class CredentialsAccountNotFoundError extends AuthError {
  code = "credentials_account_not_found";
  constructor(message: string = messages.globals.account.notFound) {
    super(message);
    this.name = "CredentialsAccountNotFoundError";
    this.code = message;
  }
}
