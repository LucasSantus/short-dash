"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { protectedActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createLinkAction = protectedActionClient
  .schema(
    z.object({
      name: z.string({ message: messages.form.REQUIRED_FIELD }),
      path: z.string({ message: messages.form.REQUIRED_FIELD }),
    }),
  )
  .action(async ({ parsedInput: { name, path }, ctx: { user } }) => {
    const newLink = await prismaClient.url.create({
      data: {
        name,
        path,
        ownerId: user.id,
      },
    });

    return newLink;
  });
