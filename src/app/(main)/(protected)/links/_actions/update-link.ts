"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { protectedActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const updateLinkAction = protectedActionClient
  .schema(
    z.object({
      id: z.string({ message: messages.form.REQUIRED_FIELD }),
      title: z.string({ message: messages.form.REQUIRED_FIELD }),
      description: z.string().optional(),
      originalUrl: z
        .string({ message: messages.form.REQUIRED_FIELD })
        .url("Insira uma url válida!"),
    }),
  )
  .action(
    async ({ parsedInput: { id, title, originalUrl }, ctx: { user } }) => {
      const updateLink = await prismaClient.url.update({
        where: {
          id,
        },
        data: {
          title,
          originalUrl,
          ownerId: user.id,
        },
      });

      return updateLink;
    },
  );
