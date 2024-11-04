import { messages } from "@/constants/messages";

export class UserNotFoundError extends Error {
  constructor(message: string = messages.globals.user.notFound) {
    super(message);
    this.name = "UserNotFoundError";
  }
}
