import { AuthError } from "next-auth";

export class CredentialsPasswordNotIsValidError extends AuthError {
  code = "credentials_password_not_is_valid";
  constructor(message = "A Senha informada está incorreta!") {
    super(message);
    this.name = "CredentialsPasswordNotIsValidError";
    this.code = message;
  }
}
