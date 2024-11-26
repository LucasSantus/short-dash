import { MAX_POPULAR_LINKS } from "@/constants/globals";
import { Prisma } from "@prisma/client";
import { endOfMonth, startOfMonth } from "date-fns";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const mostClickedLinksQuery = protectedProcedure
  .input(
    z.object({
      search: z.object({
        month: z.coerce.number().min(1).max(12),
        year: z.coerce.number(),
      }),
    })
  )
  .query(async ({ input: { search }, ctx: { session, db } }) => {
    const startOfCurrentMonth = search ? startOfMonth(new Date(search.year, search.month - 1)) : undefined;
    const endOfCurrentMonth = search ? endOfMonth(new Date(search.year, search.month - 1)) : undefined;

    const where: Prisma.LinkWhereInput = {
      ownerId: session.user.id,
      createdAt: {
        gte: startOfCurrentMonth,
        lte: endOfCurrentMonth,
      },
    };

    const links = await db.link.findMany({
      where,
      take: MAX_POPULAR_LINKS,
      select: {
        id: true,
        title: true,
        clicks: true,
      },
    });

    const data = links?.map(({ id, title, clicks }) => ({
      id,
      title,
      amountOfAccesses: clicks,
    }));

    return {
      data,
    };
  });
