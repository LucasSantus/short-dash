import { messages } from "@/constants/messages";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const deleteLinkMutationRoute = protectedProcedure
  .input(
    z.object({
      id: z.string({ message: messages.form.REQUIRED_FIELD }),
    })
  )
  .mutation(async ({ input: { id }, ctx: { db } }) => {
    await db.url.delete({
      where: {
        id,
      },
    });
  });

export const deleteMultipleLinksMutationRoute = protectedProcedure
  .input(
    z.object({
      ids: z.array(z.string({ message: messages.form.REQUIRED_FIELD })),
    })
  )
  .mutation(async ({ input: { ids }, ctx: { db } }) => {
    await db.url.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  });
