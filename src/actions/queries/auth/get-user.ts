"use server";

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { Account } from "@prisma/client";
import type { User } from "next-auth";
import { cache } from "react";

interface UserResponse {
  user: User;
  account: Account;
  isAuthenticated: true;
}

export const getUser = cache(async (): Promise<UserResponse> => {
  const data = await auth();

  if (!data) throw new Error("Usuário não está autenticado!");

  const account = await prismaClient.account.findFirst({
    where: {
      userId: data.user.id,
    },
  });

  if (!account) throw new Error("Conta não foi encontrada!");

  return {
    user: data.user,
    account,
    isAuthenticated: true,
  };
});
