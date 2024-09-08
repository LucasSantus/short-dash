import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createNewCode } from "@/utils/create-new-code";
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
          orderBy: z.enum(["desc", "asc"]),
        }),
      )
      .query(
        async ({ input: { search, orderBy, pagination }, ctx: { userId } }) => {
          let whereCondition: any = {
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
