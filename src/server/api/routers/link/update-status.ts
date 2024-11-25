import { LinkStatus } from "@/app/(main)/(protected)/links/_types/links";
import { messages } from "@/constants/messages";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateStatusMultipleLinkMutationRoute = protectedProcedure
  .input(
    z.object({
      ids: z.array(z.string({ message: messages.globals.form.requiredField })),
      status: z.nativeEnum(LinkStatus),
    })
  )
  .mutation(async ({ input: { ids, status }, ctx: { db, session } }) => {
    await db.link.updateMany({
      where: {
        id: {
          in: ids,
        },
        ownerId: session.user.id,
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
  });
