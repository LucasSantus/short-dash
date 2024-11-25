import { messages } from "@/constants/messages";
import { AuthError } from "next-auth";

export class CredentialsUserDeactivateError extends AuthError {
  code = "credentials_user_deactivate";
  constructor(message: string = messages.globals.user.deactivate) {
    super(message);
    this.name = "CredentialsUserDeactivateError";
    this.code = message;
  }
}
