import { LinkStatus } from "@/app/(main)/(protected)/links/_types/links";
import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createNewCode } from "@/utils/create-new-code";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const linksRouter = createTRPCRouter({
  link: {
    getLinks: protectedProcedure
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
        }),
      )
      .query(
        async ({
          input: { search, pagination, statuses },
          ctx: { userId },
        }) => {
          let whereCondition: Prisma.UrlWhereInput = {
            ownerId: userId,
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

          if (statuses && statuses.length > 0) {
            whereCondition = {
              ...whereCondition,
              status: {
                in: statuses,
              },
            };
          }

          const [links, totalLinks] = await Promise.all([
            prismaClient.url.findMany({
              where: whereCondition,
              orderBy: {
                createdAt: "desc",
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
        },
      ),

    createLink: protectedProcedure
      .input(
        z.object({
          title: z.string({ message: messages.form.REQUIRED_FIELD }),
          description: z.string().optional(),
          originalUrl: z
            .string({ message: messages.form.REQUIRED_FIELD })
            .url(messages.form.MUST_BE_URL_VALID),
        }),
      )
      .mutation(
        async ({
          input: { title, description, originalUrl },
          ctx: { userId },
        }) => {
          let code: string;
          let isUniqueCode: boolean;

          do {
            code = createNewCode();

            const codeIfExists = await prismaClient.url.findUnique({
              where: { code },
            });

            isUniqueCode = !!codeIfExists;
          } while (isUniqueCode);

          const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

          await prismaClient.url.create({
            data: {
              title,
              description,
              code,
              originalUrl,
              shortUrl,
              ownerId: userId,
            },
          });
        },
      ),

    updateLink: protectedProcedure
      .input(
        z.object({
          id: z.string({ message: messages.form.REQUIRED_FIELD }),
          title: z.string({ message: messages.form.REQUIRED_FIELD }),
          description: z.string().optional(),
          originalUrl: z
            .string({ message: messages.form.REQUIRED_FIELD })
            .url(messages.form.MUST_BE_URL_VALID),
        }),
      )
      .mutation(async ({ input: { id, title, description, originalUrl } }) => {
        await prismaClient.url.update({
          where: {
            id,
          },
          data: {
            title,
            description,
            originalUrl,
            updatedAt: new Date(),
          },
        });
      }),

    deleteLink: protectedProcedure
      .input(
        z.object({
          id: z.string({ message: messages.form.REQUIRED_FIELD }),
        }),
      )
      .mutation(async ({ input: { id } }) => {
        await prismaClient.url.delete({
          where: {
            id,
          },
        });
      }),
  },
});
