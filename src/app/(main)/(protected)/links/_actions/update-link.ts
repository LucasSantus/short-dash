"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { protectedActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const updateLinkAction = protectedActionClient
  .schema(
    z.object({
      id: z.string({ message: messages.form.REQUIRED_FIELD }),
      name: z.string({ message: messages.form.REQUIRED_FIELD }),
      code: z.string({ message: messages.form.REQUIRED_FIELD }),
      path: z
        .string({ message: messages.form.REQUIRED_FIELD })
        .url("Insira uma url válida!"),
    }),
  )
  .action(async ({ parsedInput: { id, name, code, path }, ctx: { user } }) => {
    const updateLink = await prismaClient.url.update({
      where: {
        id,
      },
      data: {
        name,
        code,
        path,
        ownerId: user.id,
      },
    });

    return updateLink;
  });
