import { prismaClient } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { Event } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const maxEventsPerCicle = 100;

export async function GET() {
  try {
    const cacheData = await redis.lrange("events-queue", 0, maxEventsPerCicle - 1);

    if (cacheData.length === 0) {
      return NextResponse.json({ message: "Nenhum evento para sincronizar." }, { status: 200 });
    }

    const parsedEvents: Event[] = cacheData.map((event) => JSON.parse(event));
    const links: Array<{ linkId: string; clicks: number }> = [];

    for (const event of parsedEvents) {
      const linkIndex = links.findIndex(({ linkId }) => linkId === event.linkId);
      if (linkIndex === -1) {
        links.push({
          linkId: event.linkId,
          clicks: 1,
        });
      } else {
        links[linkIndex]!.clicks += 1;
      }
    }

    const linkUpdatePromises = links.map(({ linkId, clicks }) =>
      prismaClient.link.update({
        where: {
          id: linkId,
        },
        data: {
          clicks: {
            increment: clicks,
          },
        },
      })
    );

    await Promise.all([
      ...linkUpdatePromises,
      prismaClient.event.createMany({
        data: parsedEvents,
      }),
    ]);

    await redis.ltrim("events-queue", maxEventsPerCicle, -1);

    const remainingEvents = await redis.llen("events-queue");

    if (remainingEvents === 0) {
      await redis.del("events-queue");

      console.info("Fila de eventos limpa após sincronização.");
    }

    return NextResponse.json({ message: `${parsedEvents.length} eventos sincronizados com sucesso.` }, { status: 200 });
  } catch (error) {
    console.error("Erro ao sincronizar eventos:", error);

    return NextResponse.json({ message: "Erro ao sincronizar eventos." }, { status: 500 });
  }
}
