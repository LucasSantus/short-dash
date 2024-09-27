import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const eventListQuery = protectedProcedure
  .input(
    z.object({
      search: z
        .object({
          userName: z.string().optional(),
          linkIds: z.array(z.string()).optional(),
          date: z
            .object({
              createdAt: z
                .object({
                  from: z.date(),
                  to: z.date().optional(),
                })
                .optional(),
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
    let where: Prisma.EventWhereInput = {};

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

          linkId: {
            in: search.linkIds,
          },
        };
      }

      if (search.date) {
        if (search.date.createdAt) {
          if (search.date.createdAt.from) {
            where = {
              ...where,

              createdAt: {
                gte: search.date.createdAt.from,
              },
            };
          }

          if (search.date.createdAt.to) {
            where = {
              ...where,

              createdAt: {
                lte: search.date.createdAt.to,
              },
            };
          }
        }
      }
    }

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
