import { messages } from "@/constants/messages";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const updateProfileMutation = publicProcedure
  .input(
    z.object({
      name: z.string({ required_error: messages.form.REQUIRED_FIELD }),
    })
  )
  .mutation(async ({ input: { name }, ctx: { db, session } }) => {
    const emailExists = await db.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });

    if (!emailExists) throw new Error(messages.globals.email.dontRegisteredOnSystem);

    await db.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        name,
      },
    });
  });
