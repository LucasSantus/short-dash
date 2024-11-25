import { messages } from "@/constants/messages";
import { AuthError } from "next-auth";

export class CredentialsUserNotFoundError extends AuthError {
  code = "credentials_user_not_found";
  constructor(message: string = messages.globals.user.notFound) {
    super(message);
    this.name = "CredentialsUserNotFoundError";
    this.code = message;
  }
}
