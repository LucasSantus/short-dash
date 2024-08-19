"use server";

import { authProtectedAction } from "@/actions/safe-action";
import { prismaClient } from "@/lib/prisma";
import { z } from "zod";

const createLinkAuthSchema = z.object({
  name: z.string(),
  path: z.string(),
});

type CreateLinkAuthSchema = z.infer<typeof createLinkAuthSchema>;

export const createLinkAuth = (input: CreateLinkAuthSchema) =>
  authProtectedAction({
    schema: createLinkAuthSchema,
    input,
    action: async (user) => {
      const newLink = await prismaClient.url.create({
        data: {
          name: input.name,
          path: input.path,
          code: "6546456",
          ownerId: user.id,
        },
      });

      return newLink;
    },
  });
