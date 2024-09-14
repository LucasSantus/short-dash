import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const historicPerLinkQueryRoute = protectedProcedure
  .input(
    z.object({
      linkId: z.string(),
      pagination: z.object({
        page: z.coerce.number(),
        pageSize: z.coerce.number(),
      }),
    })
  )
  .query(async ({ input: { linkId, pagination }, ctx: { db } }) => {
    const where: Prisma.HistoricWhereInput = {
      urlId: linkId,
    };

    const [historic, totalCount] = await Promise.all([
      db.historic.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (pagination.page - 1) * pagination.pageSize,
        take: pagination.pageSize,
        include: {
          url: true,
          user: true,
        },
      }),
      db.historic.count({
        where,
      }),
    ]);

    const pageCount = pagination ? Math.ceil(totalCount / pagination.pageSize) : 1;

    return {
      historic,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalCount,
        pageCount,
      },
    };
  });
