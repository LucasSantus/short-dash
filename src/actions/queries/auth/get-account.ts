"use server";

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { Account } from "@prisma/client";
import { cache } from "react";

interface AccountResponse {
  account: Account;
}

export const getAccount = cache(async (): Promise<AccountResponse> => {
  const data = await auth();

  if (!data) throw new Error("Usuário não está autenticado!");

  const account = await prismaClient.account.findFirst({
    where: {
      userId: data.user.id,
    },
  });

  if (!account) throw new Error("Conta não foi encontrada!");

  return {
    account,
  };
});
