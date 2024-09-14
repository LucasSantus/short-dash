import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const getUserPerNameQueryRoute = protectedProcedure
  .input(
    z.object({
      search: z.object({
        name: z.string(),
      }),
    })
  )
  .query(async ({ input: { search }, ctx: { db } }) => {
    const users = await db.user.findMany({
      where: {
        name: {
          contains: search.name,
          mode: "insensitive",
        },
      },
    });

    if (!users.length)
      return [] as Array<{
        label: string;
        value: string;
      }>;

    return users.map(({ name, id }) => ({
      label: name,
      value: id,
    }));
  });
