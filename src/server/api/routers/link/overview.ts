import { endOfMonth, startOfMonth } from "date-fns";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const overviewQuery = protectedProcedure
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

    const startOfLastMonth = search ? startOfMonth(new Date(search.year, search.month)) : undefined;
    const endOfLastMonth = search ? endOfMonth(new Date(search.year, search.month)) : undefined;

    const [totalClicks, totalClicksThisMonth, totalLinksCreated, totalLinksCreatedThisMonth] = await Promise.all([
      db.event.count({
        where: {
          link: {
            ownerId: session.user.id,
          },
          createdAt: {
            gte: startOfCurrentMonth,
            lte: endOfCurrentMonth,
          },
        },
      }),
      db.event.count({
        where: {
          link: {
            ownerId: session.user.id,
          },
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      db.link.count({
        where: {
          ownerId: session.user.id,
          createdAt: {
            gte: startOfCurrentMonth,
            lte: endOfCurrentMonth,
          },
        },
      }),
      db.link.count({
        where: {
          ownerId: session.user.id,
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
    ]);

    return {
      totalClicks: totalClicks ?? 0,
      totalClicksThisMonth: totalClicksThisMonth ?? 0,
      totalLinksCreated: totalLinksCreated ?? 0,
      totalLinksCreatedThisMonth: totalLinksCreatedThisMonth ?? 0,
    };
  });
