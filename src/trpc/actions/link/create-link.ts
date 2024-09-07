/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { authMiddleware } from "@/lib/auth-middleware";
import { prismaClient } from "@/lib/prisma";
import { createNewCode } from "@/utils/create-new-code";
import { z } from "zod";

export const createLinkRouterSchema = z.object({
  title: z.string({ message: "Title is required" }),
  description: z.string({ message: "Description is required" }),
  originalUrl: z
    .string({ message: "Original URL is required" })
    .url("Must be a valid URL"),
});

export type CreateLinkRouterInput = z.infer<typeof createLinkRouterSchema>;

export const createNewLink = (input: CreateLinkRouterInput) =>
  authMiddleware({
    fn: async ({ user }) => {
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

      const newLink = await prismaClient.url.create({
        data: {
          title: input.title,
          description: input.description,
          code,
          originalUrl: input.originalUrl,
          shortUrl,
          ownerId: user.id,
        },
      });

      return {
        status: "success",
        data: { link: newLink },
      };
    },
  });
