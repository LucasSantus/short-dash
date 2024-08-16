"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { SignUpFormData } from "@/validation/auth/sign-up";
import { redirect } from "next/navigation";

export async function authSignUpServer({
  firstName,
  lastName,
  email,
  password,
}: SignUpFormData) {
  const emailExists = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  console.log(1, { emailExists });

  if (emailExists) throw new Error(messages.account.EMAIL_REGISTERED_ON_SYSTEM);

  // const hashedPassword = await bcrypt.hash(password, 10);

  await prismaClient.user.create({
    data: {
      firstName,
      lastName,
      email,
      hashedPassword: password,
    },
  });

  console.log(3);

  redirect("/");

  // await prismaClient.account.create({
  //   data: {
  //     provider: "credentials",
  //     type: "credentials",
  //     providerAccountId: crypto.randomUUID(),
  //     userId: user.id,
  //   },
  // });
}
