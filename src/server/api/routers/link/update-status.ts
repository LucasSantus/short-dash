import { LinkStatus } from "@/app/(main)/(protected)/links/_types/links";
import { messages } from "@/constants/messages";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateStatusMultipleLinkMutationRoute = protectedProcedure
  .input(
    z.object({
      ids: z.array(z.string({ message: messages.form.REQUIRED_FIELD })),
      status: z.nativeEnum(LinkStatus),
    })
  )
  .mutation(async ({ input: { ids, status }, ctx: { db } }) => {
    await db.link.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
  });
