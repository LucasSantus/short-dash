import { messages } from "@/constants/messages";
import { isAfter, subMinutes } from "date-fns";
import { z } from "zod";
import { withoutDelayProcedure } from "../../trpc";

const MAX_EVENTS_ON_MINUTE: number = 40;

export const redirectUrlByCodeMutation = withoutDelayProcedure
  .input(
    z.object({
      code: z.string({ message: messages.form.REQUIRED_FIELD }),
    })
  )
  .mutation(async ({ input: { code }, ctx: { db, session } }) => {
    const { user, isAuthenticated } = session;

    const [link, events] = await Promise.all([
      db.link.findUnique({
        where: {
          code,
        },
      }),
      db.event.findMany({
        where: {
          link: {
            code,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: MAX_EVENTS_ON_MINUTE,
      }),
    ]);

    if (events.length > MAX_EVENTS_ON_MINUTE) {
      const firstEvent = events[0];

      if (firstEvent) {
        const oneMinuteAgo = subMinutes(new Date(), 1);

        const wasCreatedLastMinute = isAfter(new Date(firstEvent.createdAt), oneMinuteAgo);

        if (wasCreatedLastMinute) {
          return link;
        }
      }
    }

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
