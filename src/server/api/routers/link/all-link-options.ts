import { MultiSelectOptions } from "@/components/ui/multi-select";
import { Prisma } from "@prisma/client";
import { protectedProcedure } from "../../trpc";

export const allLinkListOptionsQuery = protectedProcedure.query(async ({ ctx: { session, db } }) => {
  const where: Prisma.LinkWhereInput = {
    ownerId: session.user.id,
  };

  const allLinks = await db.link.findMany({
    where,
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  if (!allLinks.length) return { data: [] as MultiSelectOptions };

  const data: MultiSelectOptions = allLinks.map(({ id, title }) => ({
    value: id,
    label: title,
  }));

  return {
    data,
  };
});
