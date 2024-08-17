"use server";

import { messages } from "@/constants/messages";
import { getSession } from "@/lib/getSession";
import { prismaClient } from "@/lib/prisma";
import { z } from "zod";

const urlByTokenSchema = z.object({
  token: z.string({
    required_error: messages.form.REQUIRED_FIELD,
  }),
});

type UrlByTokenSchema = z.infer<typeof urlByTokenSchema>;

export async function getUrlByToken(values: UrlByTokenSchema) {
  const { isAuthenticated, user } = await getSession();

  const { success, data } = urlByTokenSchema.safeParse(values);

  if (!success) {
    throw new Error(messages.globals.ERROR_VALUES_VALIDATION);
  }

  const url = await prismaClient.url.findUnique({
    where: {
      token: data.token,
    },
  });

  if (!url) throw new Error("Falha ao tentar procurar essa url");

  await Promise.all([
    prismaClient.url.update({
      where: {
        token: data.token,
      },
      data: {
        numberOfVisitors: url.numberOfVisitors + 1,
      },
    }),
    prismaClient.historic.create({
      data: {
        isAnonymous: !isAuthenticated,
        urlId: url.id,
        userId: user ? user.id : null,
      },
    }),
  ]);

  return url;
}
