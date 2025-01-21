import "server-only";

import { getUser } from "@/actions/queries/auth/get-user";
import { REDIS_TIME_CACHE } from "@/constants/globals";
import { prismaClient } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { Link } from "@prisma/client";
import { cache } from "react";
import { LinkStatus } from "../(protected)/links/_types/links";
import { addEventToQueue } from "./add-event-to-queue";

export const getShortUrl = cache(async (code: string) => {
  const session = await getUser();

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

  await redis.set(cacheKey, JSON.stringify(link), "EX", REDIS_TIME_CACHE);

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

  return link;
});
