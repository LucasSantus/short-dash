import { messages } from "@/constants/messages";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateLinkMutation = protectedProcedure
  .input(
    z.object({
      id: z.string({ message: messages.form.REQUIRED_FIELD }),
      title: z.string({ message: messages.form.REQUIRED_FIELD }),
      description: z.string().optional(),
      originalUrl: z.string({ message: messages.form.REQUIRED_FIELD }).url(messages.form.MUST_BE_URL_VALID),
    })
  )
  .mutation(async ({ input: { id, title, description, originalUrl }, ctx: { db } }) => {
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
  });
