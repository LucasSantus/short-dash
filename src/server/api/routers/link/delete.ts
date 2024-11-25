import { messages } from "@/constants/messages";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const deleteMultipleLinksMutationRoute = protectedProcedure
  .input(
    z.object({
      ids: z.array(z.string({ message: messages.globals.form.requiredField })),
    })
  )
  .mutation(async ({ input: { ids }, ctx: { db } }) => {
    await db.link.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  });
