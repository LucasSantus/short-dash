import { LinkStatus } from "@/app/(main)/(protected)/links/_types/links";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const linksQueryRoute = protectedProcedure
  .input(
    z.object({
      search: z
        .object({
          title: z.string().optional(),
        })
        .optional(),
      pagination: z.object({
        page: z.coerce.number(),
        pageSize: z.coerce.number(),
      }),
      statuses: z.array(z.nativeEnum(LinkStatus)).optional(),
    })
  )
  .query(async ({ input: { search, pagination, statuses }, ctx: { session, db } }) => {
    let where: Prisma.UrlWhereInput = {
      ownerId: session.user.id,
    };

    if (search) {
      where = {
        ...where,

        title: {
          contains: search.title,
          mode: "insensitive",
        },
      };
    }

    if (statuses && statuses.length > 0) {
      where = {
        ...where,
        status: {
          in: statuses,
        },
      };
    }

    const [links, totalCount] = await Promise.all([
      db.url.findMany({
        where,
        orderBy: {
          updatedAt: "desc",
        },
        skip: (pagination.page - 1) * pagination.pageSize,
        take: pagination.pageSize,
      }),
      db.url.count({
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
