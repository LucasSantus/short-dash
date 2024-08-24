import { messages } from "@/constants/messages";

export class AccountNotFoundError extends Error {
  constructor(message: string = messages.account.ACCOUNT_NOT_FOUND) {
    super(message);
    this.name = "AccountNotFoundError";
  }
}
