import { endOfMonth, startOfMonth } from "date-fns";
import { protectedProcedure } from "../../trpc";

export const overviewQuery = protectedProcedure.query(async ({ ctx: { session, db } }) => {
  const startOfCurrentMonth = startOfMonth(new Date());
  const endOfCurrentMonth = endOfMonth(new Date());

  const [totalClicks, totalClicksThisMonth, totalLinksCreated, totalLinksCreatedThisMonth] = await Promise.all([
    db.event.count({
      where: {
        link: {
          ownerId: session.user.id,
        },
      },
    }),
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
    db.link.count({
      where: {
        ownerId: session.user.id,
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
  ]);

  return {
    totalClicks: totalClicks ?? 0,
    totalClicksThisMonth: totalClicksThisMonth ?? 0,
    totalLinksCreated: totalLinksCreated ?? 0,
    totalLinksCreatedThisMonth: totalLinksCreatedThisMonth ?? 0,
  };
});
