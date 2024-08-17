"use server";

import { prismaClient } from "@/lib/prisma";
import { protectedActionClient } from "@/lib/safe-action";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  path: z.string(),
});

export const updateLinkAction = protectedActionClient
  .schema(schema)
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
