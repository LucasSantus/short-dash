import { messages } from "@/constants/messages";
import { z } from "zod";
import { withoutDelayProcedure } from "../../trpc";

export const redirectUrlByCodeMutation = withoutDelayProcedure
  .input(
    z.object({
      code: z.string({ message: messages.form.REQUIRED_FIELD }),
    })
  )
  .mutation(async ({ input: { code }, ctx: { db, session } }) => {
    const { user, isAuthenticated } = session;

    const link = await db.link.findUnique({
      where: {
        code,
      },
    });

    if (!link) throw new Error("Falha ao tentar achar essa url");

    if (link.status === "Inactive") {
      return link;
    }

    Promise.all([
      db.link.update({
        where: {
          code,
        },
        data: {
          amountOfAccesses: link.amountOfAccesses + 1,
        },
      }),
      db.event.create({
        data: {
          isAnonymous: !isAuthenticated,
          linkId: link.id,
          userId: user ? user.id : null,
        },
      }),
    ]);

    return link;
  });
