import { LinkStatus } from "@/app/(main)/(protected)/links/_types/links";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const linksQuery = protectedProcedure
  .input(
    z.object({
      search: z
        .object({
          title: z.string().optional(),

          statuses: z.array(z.nativeEnum(LinkStatus)).optional(),
        })
        .optional(),

      pagination: z.object({
        page: z.coerce.number(),
        pageSize: z.coerce.number(),
      }),
    })
  )
  .query(async ({ input: { search, pagination }, ctx: { session, db } }) => {
    const whereClauses: Prisma.LinkWhereInput[] = [
      {
        ownerId: session.user.id,
      },
    ];

    if (search) {
      whereClauses.push({
        title: {
          contains: search.title,
          mode: "insensitive",
        },
      });

      if (search.statuses && search.statuses.length > 0) {
        whereClauses.push({
          status: {
            in: search.statuses,
          },
        });
      }
    }

    const where: Prisma.LinkWhereInput = {
      AND: whereClauses,
    };

    const [links, totalCount] = await Promise.all([
      db.link.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (pagination.page - 1) * pagination.pageSize,
        take: pagination.pageSize,
        include: {
          _count: {
            select: {
              events: true,
            },
          },
          events: {
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      }),
      db.link.count({
        where,
      }),
    ]);

    const pageCount = pagination ? Math.ceil(totalCount / pagination.pageSize) : 1;

    return {
      links,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalCount,
        pageCount,
      },
    };
  });
