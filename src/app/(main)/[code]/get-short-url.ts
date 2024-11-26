import "server-only";

import { prismaClient } from "@/lib/prisma";
import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { cache } from "react";
import { LinkStatus } from "../(protected)/links/_types/links";

export const getShortUrl = cache(async (code: string) => {
  const [session, link] = await Promise.all([
    getServerAuthSession(),
    prismaClient.link.findFirst({
      where: { code },
    }),
  ]);

  if (!link) return null;

  if (link.status === LinkStatus.Inactive) {
    return link;
  }

  await Promise.all([
    prismaClient.link.update({
      where: { code },
      data: { clicks: link.clicks + 1 },
    }),
    prismaClient.event.create({
      data: {
        isAnonymous: !session.isAuthenticated,
        linkId: link.id,
        userId: session.user ? session.user.id : null,
      },
    }),
  ]);

  return link;
});
