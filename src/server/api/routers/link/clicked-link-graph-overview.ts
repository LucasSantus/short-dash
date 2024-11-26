import { Prisma } from "@prisma/client";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const clickedLinkGraphOverviewQuery = protectedProcedure
  .input(
    z.object({
      search: z.object({
        linkId: z.string().nullable(),
        month: z.coerce.number().min(1).max(12),
        year: z.coerce.number(),
      }),
    })
  )
  .query(async ({ input: { search }, ctx: { session, db } }) => {
    const whereClauses: Prisma.LinkWhereInput[] = [
      {
        ownerId: session.user.id,
      },
    ];

    if (search) {
      if (search.linkId) {
        whereClauses.push({
          id: search.linkId,
        });
      }
    }

    const where: Prisma.LinkWhereInput = {
      AND: whereClauses,
    };

    const startOfCurrentMonth = search ? startOfMonth(new Date(search.year, search.month - 1)) : undefined;
    const endOfCurrentMonth = search ? endOfMonth(new Date(search.year, search.month - 1)) : undefined;

    const links = await db.link.findMany({
      where,
      include: {
        events: {
          where:
            startOfCurrentMonth && endOfCurrentMonth
              ? {
                  createdAt: {
                    gte: startOfCurrentMonth,
                    lte: endOfCurrentMonth,
                  },
                }
              : undefined,
        },
      },
    });

    const daysInterval =
      startOfCurrentMonth && endOfCurrentMonth
        ? eachDayOfInterval({
            start: startOfCurrentMonth,
            end: endOfCurrentMonth,
          })
        : [];

    const data = daysInterval?.map((day) => {
      const formattedDate = format(day, "yyyy-MM-dd");

      const dailyClicks = links.map(({ title, events }) => {
        const clicksOnDay = events.filter((event) => format(event.createdAt, "yyyy-MM-dd") === formattedDate).length;

        return {
          date: formattedDate,
          title,
          clicks: clicksOnDay,
        };
      });

      return dailyClicks;
    });

    return {
      data: data.flat(),
    };
  });
