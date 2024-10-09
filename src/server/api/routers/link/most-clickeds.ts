import { MAX_POPULAR_LINKS } from "@/constants/globals";
import { Prisma } from "@prisma/client";
import { protectedProcedure } from "../../trpc";

export const mostClickedLinksQuery = protectedProcedure.query(async ({ ctx: { session, db } }) => {
  const where: Prisma.LinkWhereInput = {
    ownerId: session.user.id,
  };

  const links = await db.link.findMany({
    where,
    orderBy: {
      amountOfAccesses: "asc",
    },
    take: MAX_POPULAR_LINKS,
  });

  const data = links?.map(({ id, title, amountOfAccesses }) => ({
    id,
    title,
    amountOfAccesses,
  }));

  return {
    data,
  };
});
