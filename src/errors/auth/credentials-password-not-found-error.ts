import { AuthError } from "next-auth";

export class CredentialsPasswordNotFoundError extends AuthError {
  code = "credentials_password_not_found";
  constructor(message: string) {
    super(message);
    this.name = "CredentialsPasswordNotFoundError";
    this.code = message;
  }
}
