import { Prisma } from "@prisma/client";
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

    await db.link.update({
      where: {
        id: link.id,
      },
      data: {
        clicks: eventCount,
      },
    });
  }
});
