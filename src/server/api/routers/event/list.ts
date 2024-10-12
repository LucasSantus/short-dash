import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const eventListQuery = protectedProcedure
  .input(
    z.object({
      search: z
        .object({
          username: z.string().optional(),
          linkIds: z.array(z.string()).optional(),
          createdAt: z
            .object({
              from: z.date().optional(),
              to: z.date().optional(),
            })
            .optional(),
        })
        .optional(),
      pagination: z.object({
        page: z.coerce.number(),
        pageSize: z.coerce.number(),
      }),
    })
  )
  .query(async ({ input: { search, pagination }, ctx: { db } }) => {
    const whereClauses: Prisma.EventWhereInput[] = [];

    if (search) {
      if (search.username) {
        whereClauses.push({
          user: {
            name: {
              contains: search.username,
              mode: "insensitive",
            },
          },
        });
      }

      if (search.linkIds && search.linkIds.length > 0) {
        whereClauses.push({
          linkId: {
            in: search.linkIds,
          },
        });
      }

      if (search.createdAt) {
        if (search.createdAt.from) {
          whereClauses.push({
            createdAt: {
              gte: search.createdAt.from,
            },
          });
        }

        if (search.createdAt.to) {
          whereClauses.push({
            createdAt: {
              lte: search.createdAt.to,
            },
          });
        }
      }
    }

    const where: Prisma.EventWhereInput = {
      AND: whereClauses,
    };

    const [data, totalCount] = await Promise.all([
      db.event.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (pagination.page - 1) * pagination.pageSize,
        take: pagination.pageSize,
        include: {
          link: true,
          user: true,
        },
      }),
      db.event.count({
        where,
      }),
    ]);

    const pageCount = pagination ? Math.ceil(totalCount / pagination.pageSize) : 1;

    return {
      data,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalCount,
        pageCount,
      },
    };
  });
