"use server";

import { prismaClient } from "@/lib/prisma";
import { protectedActionClient } from "@/lib/safe-action";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export const deleteLinkAction = protectedActionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    await prismaClient.url.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
    };
  });
