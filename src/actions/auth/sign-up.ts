"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { SignUpFormData } from "@/validation/auth/sign-up";
import bcrypt from "bcryptjs";

export async function authSignUpServer({
  name,
  email,
  password,
}: SignUpFormData) {
  if (!name || !email || !password)
    throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const emailExists = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) throw new Error(messages.account.EMAIL_REGISTERED_ON_SYSTEM);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  if (!user) throw new Error("erro ao criar novo usuário");

  const newAccount = await prismaClient.account.create({
    data: {
      providerId: "credentials",
      providerType: "credentials",
      providerAccountId: crypto.randomUUID(),
      userId: user.id,
    },
  });

  if (!newAccount) throw new Error("erro ao criar nova conta");

  return newAccount;
}
