"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { compare } from "bcryptjs";

export async function signInAction({ email, password }: { email: string; password: string }) {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.deletedAt) throw new Error("Este usuário foi deletado!");

  const account = await prismaClient.account.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!account) throw new Error(messages.account.ACCOUNT_NOT_FOUND);

  if (!user.hashedPassword) throw new Error("Ocorreu um problema ao tentar recuperar a Conta!");

  const passwordMatch = compare(password, user.hashedPassword);

  if (!passwordMatch) throw new Error("A Senha informada está incorreta!");

  const userData = {
    name: user.name,
    email: user.email,
    id: user.id,
  };

  return userData;
}
