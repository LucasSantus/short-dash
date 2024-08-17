"use server";

import { prismaClient } from "@/lib/prisma";
import { protectedActionClient } from "@/lib/safe-action";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  code: z.string(),
  path: z.string(),
});

export const createLinkAction = protectedActionClient
  .schema(schema)
  .action(async ({ parsedInput: { name, code, path }, ctx: { user } }) => {
    const newLink = await prismaClient.url.create({
      data: {
        name,
        code,
        path,
        ownerId: user.id,
      },
    });

    return newLink;
  });
