import { MAX_POPULAR_LINKS } from "@/constants/globals";
import { Prisma } from "@prisma/client";
import { protectedProcedure } from "../../trpc";

export const mostClickedLinksQuery = protectedProcedure.query(async ({ ctx: { session, db } }) => {
  const where: Prisma.LinkWhereInput = {
    ownerId: session.user.id,
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
