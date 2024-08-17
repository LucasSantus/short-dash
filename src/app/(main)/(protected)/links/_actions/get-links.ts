"use server";

import { prismaClient } from "@/lib/prisma";
import { protectedActionClient } from "@/lib/safe-action";

export const getLinks = protectedActionClient.action(
  async ({ ctx: { user } }) => {
    const links = await prismaClient.url.findMany({
      where: {
        ownerId: user.id,
      },
    });

    return links;
  },
);
