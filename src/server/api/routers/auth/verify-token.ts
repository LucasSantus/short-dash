"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { isBefore } from "date-fns";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const verifyTokenQuery = publicProcedure
  .input(
    z.object({
      token: z.string({ required_error: messages.form.REQUIRED_FIELD }),
    })
  )
  .mutation(async ({ input: { token } }) => {
    const verificationToken = await prismaClient.verificationToken.findFirst({
      where: {
        token,
      },
    });

    if (!verificationToken) throw new Error("O token fornecido é inválido. Por favor, solicite um novo.");

    if (isBefore(verificationToken.expires, new Date())) {
      throw new Error("O token expirou. Solicite um novo para continuar.");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: verificationToken.userId,
      },
    });

    if (!user) throw new Error(messages.globals.user.notFound);

    return {
      user,
    };
  });
