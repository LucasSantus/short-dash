import { Prisma } from "@prisma/client";
import { eachDayOfInterval, format } from "date-fns";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const clickedLinkGraphOverviewQuery = protectedProcedure
  .input(
    z.object({
      search: z
        .object({
          linkId: z.string().optional(),
          createdAt: z
            .object({
              from: z.date(),
              to: z.date(),
            })
            .optional(),
        })
        .optional(),
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

    const links = await db.link.findMany({
      where,
      include: {
        events: {
          where: search?.createdAt
            ? {
                createdAt: {
                  gte: search.createdAt.from,
                  lte: search.createdAt.to,
                },
              }
            : undefined,
        },
        _count: {
          select: {
            events: true,
          },
        },
      },
    });

    const daysInterval = search?.createdAt
      ? eachDayOfInterval({
          start: search.createdAt.from,
          end: search.createdAt.to,
        })
      : [];

    const data = daysInterval.map((day) => {
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
