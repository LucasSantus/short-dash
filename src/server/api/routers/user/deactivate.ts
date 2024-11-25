import { messages } from "@/constants/messages";
import { publicProcedure } from "../../trpc";

export const deactivateMutation = publicProcedure.mutation(async ({ ctx: { db, session } }) => {
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
      deletedAt: new Date(),
    },
  });
});
