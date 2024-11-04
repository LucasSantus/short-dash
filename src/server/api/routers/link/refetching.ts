import { LinkStatus } from "@/app/(main)/(protected)/links/_types/links";
import { Prisma } from "@prisma/client";
import { isBefore } from "date-fns";
import { protectedProcedure } from "../../trpc";

export const redirectUrlByCodeMutation = protectedProcedure.mutation(async ({ ctx: { db, session } }) => {
  const where: Prisma.LinkWhereInput = {
    ownerId: session.user.id,
  };

  const allLinks = await db.link.findMany({
    where,
  });

  for (const link of allLinks) {
    const eventCount = await db.event.count({
      where: {
        linkId: link.id,
      },
    });

    if (link.status !== LinkStatus.Expired && link.expiresAt && !isBefore(link.expiresAt, new Date())) {
      db.link.update({
        where: {
          id: link.id,
          status: LinkStatus.Expired,
        },
        data: {
          clicks: eventCount,
        },
      });
    } else {
      await db.link.update({
        where: {
          id: link.id,
        },
        data: {
          clicks: eventCount,
        },
      });
    }
  }
});
