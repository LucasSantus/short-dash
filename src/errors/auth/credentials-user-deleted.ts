import { messages } from "@/constants/messages";
import { AuthError } from "next-auth";

export class CredentialsUserDeletedError extends AuthError {
  code = "credentials_user_deleted";
  constructor(message: string = messages.globals.user.deleted) {
    super(message);
    this.name = "CredentialsUserDeletedError";
    this.code = message;
  }
}
