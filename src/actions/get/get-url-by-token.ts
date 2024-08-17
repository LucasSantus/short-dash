"use server";

import { messages } from "@/constants/messages";
import { getSession } from "@/lib/getSession";
import { prismaClient } from "@/lib/prisma";
import { z } from "zod";

const urlByCodeSchema = z.object({
  code: z.string({
    required_error: messages.form.REQUIRED_FIELD,
  }),
});

type UrlByCodeSchema = z.infer<typeof urlByCodeSchema>;

export async function getUrlByCode(values: UrlByCodeSchema) {
  const { isAuthenticated, user } = await getSession();

  const { success, data } = urlByCodeSchema.safeParse(values);

  if (!success) {
    throw new Error(messages.globals.ERROR_VALUES_VALIDATION);
  }

  const url = await prismaClient.url.findUnique({
    where: {
      code: data.code,
    },
  });

  if (!url) throw new Error("Falha ao tentar procurar essa url");

  await Promise.all([
    prismaClient.url.update({
      where: {
        code: data.code,
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
