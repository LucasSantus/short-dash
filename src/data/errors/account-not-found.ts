import { messages } from "@/constants/messages";

export class AccountNotFoundError extends Error {
  constructor(message: string = messages.globals.account.notFound) {
    super(message);
    this.name = "AccountNotFoundError";
  }
}
