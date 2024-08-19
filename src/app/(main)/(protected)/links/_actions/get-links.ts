/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prismaClient } from "@/lib/prisma";
import { protectedActionClient } from "@/lib/safe-action";
import { z } from "zod";

const schema = z.object({
  pagination: z.object({
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
  }),
  search: z
    .object({
      name: z.string().optional(),
    })
    .optional(),
  orderBy: z.enum(["desc", "asc"]),
});

export type GetLinksSchema = z.infer<typeof schema>;

export const getLinks = protectedActionClient
  .schema(schema)
  .action(
    async ({ parsedInput: { pagination, search, orderBy }, ctx: { user } }) => {
      let whereCondition = {
        ownerId: user.id,
      };

      if (search) {
        whereCondition = {
          ...whereCondition,

          name: {
            contains: search.name,
            mode: "insensitive",
          },
        };
      }

      const links = await prismaClient.url.findMany({
        where: whereCondition,
        orderBy: {
          name: orderBy,
        },
        skip: (pagination.page - 1) * pagination.pageSize,
        take: pagination.pageSize,
      });

      const totalLinks = await prismaClient.url.count({
        where: whereCondition,
      });

      return {
        links,
        totalLinks,
        currentPage: pagination.page,
        totalPages: Math.ceil(totalLinks / pagination.pageSize),
      };
    },
  );
