import { messages } from "@/constants/messages";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateLinkMutation = protectedProcedure
  .input(
    z.object({
      id: z.string({ message: messages.globals.form.requiredField }),
      title: z.string({ message: messages.globals.form.requiredField }),
      description: z.string().optional(),
      originalUrl: z.string({ message: messages.globals.form.requiredField }).url(messages.globals.data.mustBeUrlValid),
    })
  )
  .mutation(async ({ input: { id, title, description, originalUrl }, ctx: { db, session } }) => {
    await db.link.update({
      where: {
        id,
        ownerId: session.user.id,
      },
      data: {
        title,
        description,
        originalUrl,
        updatedAt: new Date(),
      },
    });
  });
