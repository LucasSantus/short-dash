import "server-only";

import { prismaClient } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { Link } from "@prisma/client";
import { cache } from "react";
import { LinkStatus } from "../(protected)/links/_types/links";
import { addEventToQueue } from "./add-event-to-queue";

export const getShortUrl = cache(async (code: string) => {
  const session = await getServerAuthSession();

  const cacheKey = `short-url:${code}`;
  const clickCacheKey = `clicks:${code}`;

  const cachedLink = await redis.get(cacheKey);

  if (cachedLink) {
    const parsedCachedLink: Link = JSON.parse(cachedLink);

    await Promise.all([
      addEventToQueue({
        isAnonymous: !session.isAuthenticated,
        linkId: parsedCachedLink.id,
        userId: session?.user?.id ?? null,
      }),

      redis.incr(clickCacheKey),
    ]);

    return parsedCachedLink;
  }

  const link = await prismaClient.link.findFirst({
    where: { code },
  });

  if (!link) return null;

  await redis.set(cacheKey, JSON.stringify(link), "EX", 3600);

  if (link.status === LinkStatus.Inactive) {
    return link;
  }

  await Promise.all([
    addEventToQueue({
      isAnonymous: !session.isAuthenticated,
      linkId: link.id,
      userId: session?.user?.id ?? null,
    }),

    redis.incr(clickCacheKey),
  ]);

  // await Promise.all([
  //   prismaClient.link.update({
  //     where: { code },
  //     data: { clicks: link.clicks + 1 },
  //   }),
  //   prismaClient.event.create({
  //     data: {
  //       isAnonymous: !session.isAuthenticated,
  //       linkId: link.id,
  //       userId: session.user ? session.user.id : null,
  //     },
  //   }),
  // ]);

  return link;
});
