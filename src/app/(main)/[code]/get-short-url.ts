import { prismaClient } from "@/lib/prisma";
import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { isBefore } from "date-fns";
import { cache } from "react";
import "server-only";

export const getShortUrl = cache(async (code: string) => {
  const [session, link] = await Promise.all([
    getServerAuthSession(),
    prismaClient.link.findFirst({
      where: { code },
    }),
  ]);

  if (!link) return null;

  // Link Expired
  if (link.expiresAt && isBefore(link.expiresAt, new Date())) {
    return null;
  }

  // Link Inactive
  if (link.status === "Inactive") {
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
