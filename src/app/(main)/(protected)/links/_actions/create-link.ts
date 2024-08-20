"use server";

import { prismaClient } from "@/lib/prisma";
import { protectedActionClient } from "@/lib/safe-action";
import { generateRandomCode } from "@/utils/random-code";
import { z } from "zod";

const createLinkAuthSchema = z.object({
  name: z.string(),
  path: z.string(),
});

export const createLinkAction = protectedActionClient
  .schema(createLinkAuthSchema)
  .action(async ({ parsedInput: { name, path }, ctx: { user } }) => {
    const code = generateRandomCode();

    const codeExists = await prismaClient.url.findFirst({
      where: {
        code,
      },
    });

    if (codeExists) {
      throw new Error(
        "Ocorreu um erro ao tentar gerar um código, tente novamente!",
      );
    }

    const newLink = await prismaClient.url.create({
      data: {
        name,
        path,
        code,
        ownerId: user.id,
      },
    });

    return newLink;
  });
