import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const historicPerLinkQueryRoute = protectedProcedure
  .input(
    z.object({
      search: z
        .object({
          userName: z.string().optional(),
          linkIds: z.array(z.string()).optional(),
        })
        .optional(),
      pagination: z.object({
        page: z.coerce.number(),
        pageSize: z.coerce.number(),
      }),
    })
  )
  .query(async ({ input: { search, pagination }, ctx: { db } }) => {
    let where: Prisma.HistoricWhereInput = {};

    if (search) {
      if (search.userName) {
        where = {
          ...where,

          user: {
            name: {
              contains: search.userName,
              mode: "insensitive",
            },
          },
        };
      }

      if (search.linkIds && search.linkIds.length > 0) {
        where = {
          ...where,

          urlId: {
            in: search.linkIds,
          },
        };
      }
    }

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
