import { LinkStatus } from "@/app/(main)/(protected)/links/_types/links";
import { messages } from "@/constants/messages";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createNewCode } from "@/utils/create-new-code";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const linkRoute = createTRPCRouter({
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
        ctx: { session, db },
      }) => {
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

        const pageCount = pagination
          ? Math.ceil(totalCount / pagination.pageSize)
          : 1;

        return {
          links,
          pagination: {
            page: pagination.page,
            pageSize: pagination.pageSize,
            totalCount,
            pageCount,
          },
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
        ctx: { db, session },
      }) => {
        let code: string;
        let isUniqueCode: boolean;

        do {
          code = createNewCode();

          const codeIfExists = await db.url.findUnique({
            where: { code },
          });

          isUniqueCode = !!codeIfExists;
        } while (isUniqueCode);

        const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

        await db.url.create({
          data: {
            title,
            description,
            code,
            originalUrl,
            shortUrl,
            ownerId: session.user.id,
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
    .mutation(
      async ({
        input: { id, title, description, originalUrl },
        ctx: { db },
      }) => {
        await db.url.update({
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
      },
    ),

  deleteLink: protectedProcedure
    .input(
      z.object({
        id: z.string({ message: messages.form.REQUIRED_FIELD }),
      }),
    )
    .mutation(async ({ input: { id }, ctx: { db } }) => {
      await db.url.delete({
        where: {
          id,
        },
      });
    }),

  redirectUrlByCode: publicProcedure
    .input(
      z.object({
        code: z.string({ message: messages.form.REQUIRED_FIELD }),
      }),
    )
    .mutation(async ({ input: { code }, ctx: { db, session } }) => {
      const { user, isAuthenticated } = session;
      const link = await db.url.findUnique({
        where: {
          code,
        },
      });

      if (!link) throw new Error("Falha ao tentar achar essa url");

      Promise.all([
        db.url.update({
          where: {
            code,
          },
          data: {
            amountOfAccesses: link.amountOfAccesses + 1,
          },
        }),
        db.urlAccess.create({
          data: {
            isAnonymous: !isAuthenticated,
            urlId: link.id,
            userId: user ? user.id : null,
          },
        }),
      ]);

      return link;
    }),
});
