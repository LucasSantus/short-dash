import { MultiSelectOptions } from "@/components/ui/multi-select";
import { protectedProcedure } from "../../trpc";

export const allLinkOptionsQuery = protectedProcedure.query(async ({ ctx: { session, db } }) => {
  const allLinks = await db.link.findMany({
    where: {
      ownerId: session.user.id,
    },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  const data: MultiSelectOptions = allLinks.map(({ id, title }) => ({
    value: id,
    label: title,
  }));

  return {
    data,
  };
});
