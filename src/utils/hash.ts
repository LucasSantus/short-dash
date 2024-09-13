import * as crypto from "node:crypto";

class Hash {
  private static readonly DEFAULT_BYTES = 20;

  static createHash(textToHash: string): string {
    return crypto.createHash("sha256").update(textToHash).digest("hex");
  }

  static randomBytes(): string {
    return crypto.randomBytes(Hash.DEFAULT_BYTES).toString("hex");
  }
}

const generateHash = Hash;

export default generateHash;
