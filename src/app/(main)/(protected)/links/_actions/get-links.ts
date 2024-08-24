/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getSession } from "@/lib/get-session";
import { prismaClient } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  search: z
    .object({
      title: z.string().optional(),
    })
    .optional(),
  pagination: z.object({
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
  }),
  orderBy: z.enum(["desc", "asc"]),
});

export type GetLinksSchema = z.infer<typeof schema>;

export async function getLinks({
  pagination,
  search,
  orderBy,
}: GetLinksSchema) {
  const { isAuthenticated, user } = await getSession();

  if (!isAuthenticated) throw new Error("Usuário não autenticado");

  let whereCondition: any = {
    ownerId: user.id,
  };

  if (search) {
    whereCondition = {
      ...whereCondition,

      title: {
        contains: search.title,
        mode: "insensitive",
      },
    };
  }

  const [links, totalLinks] = await Promise.all([
    prismaClient.url.findMany({
      where: whereCondition,
      orderBy: {
        title: orderBy,
      },
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
    }),
    prismaClient.url.count({
      where: whereCondition,
    }),
  ]);

  return {
    links,
    totalLinks,
    currentPage: pagination.page,
    totalPages: Math.ceil(totalLinks / pagination.pageSize),
  };
}
