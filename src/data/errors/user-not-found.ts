import { messages } from "@/constants/messages";

export class UserNotFoundError extends Error {
  constructor(message: string = messages.account.USER_NOT_FOUND) {
    super(message);
    this.name = "UserNotFoundError";
  }
}
