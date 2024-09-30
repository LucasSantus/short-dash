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
    const clauses: Prisma.EventWhereInput[] = [];

    if (search) {
      if (search.username) {
        clauses.push({
          user: {
            name: {
              contains: search.username,
              mode: "insensitive",
            },
          },
        });
      }

      if (search.linkIds && search.linkIds.length > 0) {
        clauses.push({
          linkId: {
            in: search.linkIds,
          },
        });
      }

      if (search.createdAt) {
        if (search.createdAt.from) {
          clauses.push({
            createdAt: {
              gte: search.createdAt.from,
            },
          });
        }

        if (search.createdAt.to) {
          clauses.push({
            createdAt: {
              lte: search.createdAt.to,
            },
          });
        }

        // where = {
        //   ...where,

        //   createdAt: {
        //     gte: search.createdAt.from ? search.createdAt.from : undefined,
        //     lte: search.createdAt.to ? search.createdAt.to : undefined,
        //   },
        // };
      }
    }

    const where: Prisma.EventWhereInput = {
      AND: clauses,
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
