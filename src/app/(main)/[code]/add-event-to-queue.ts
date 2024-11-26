import "server-only";

import { redis } from "@/lib/redis";

interface EventoToQueue {
  linkId: string;
  isAnonymous: boolean;
  userId: string | null;
}

export async function addEventToQueue({ linkId, isAnonymous, userId }: EventoToQueue) {
  const event = JSON.stringify({ linkId, isAnonymous, userId, createdAt: new Date() });

  await redis.lpush("events-queue", event);
}
