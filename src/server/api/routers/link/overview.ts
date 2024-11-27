import { endOfMonth, isAfter, startOfMonth } from "date-fns";
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
    const today = new Date();
    const dateSearchrable = new Date(search.year, search.month - 1);

    const isFutureDate = isAfter(dateSearchrable, today);

    const startOfCurrentMonth = isFutureDate ? startOfMonth(new Date(search.year, search.month - 1)) : undefined;
    const endOfCurrentMonth = isFutureDate ? endOfMonth(new Date(search.year, search.month - 1)) : undefined;

    const startOfLastMonth = isFutureDate ? startOfMonth(new Date(search.year, search.month)) : undefined;
    const endOfLastMonth = isFutureDate ? endOfMonth(new Date(search.year, search.month)) : undefined;

    const [totalClicks, totalClicksThisMonth, totalLinksCreated, totalLinksCreatedThisMonth] = await Promise.all([
      db.event.count({
        where: {
          link: {
            ownerId: session.user.id,
          },
          createdAt: isFutureDate
            ? {
                gte: startOfCurrentMonth,
                lte: endOfCurrentMonth,
              }
            : undefined,
        },
      }),
      db.event.count({
        where: {
          link: {
            ownerId: session.user.id,
          },
          createdAt: isFutureDate
            ? {
                gte: startOfLastMonth,
                lte: endOfLastMonth,
              }
            : undefined,
        },
      }),
      db.link.count({
        where: {
          ownerId: session.user.id,
          createdAt: isFutureDate
            ? {
                gte: startOfCurrentMonth,
                lte: endOfCurrentMonth,
              }
            : undefined,
        },
      }),
      db.link.count({
        where: {
          ownerId: session.user.id,
          createdAt: isFutureDate
            ? {
                gte: startOfLastMonth,
                lte: endOfLastMonth,
              }
            : undefined,
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
