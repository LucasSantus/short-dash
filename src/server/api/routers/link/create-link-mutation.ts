import { messages } from "@/constants/messages";
import { createNewCode } from "@/utils/create-new-code";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const createLinkMutationRoute = protectedProcedure
  .input(
    z.object({
      title: z.string({ message: messages.form.REQUIRED_FIELD }),
      description: z.string().optional(),
      originalUrl: z.string({ message: messages.form.REQUIRED_FIELD }).url(messages.form.MUST_BE_URL_VALID),
    })
  )
  .mutation(async ({ input: { title, description, originalUrl }, ctx: { db, session } }) => {
    let code: string;
    let isUniqueCode: boolean;

    do {
      code = createNewCode();

      const codeIfExists = await db.url.findUnique({
        where: { code },
      });

      isUniqueCode = !!codeIfExists;
    } while (isUniqueCode);

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

    await db.url.create({
      data: {
        title,
        description,
        code,
        originalUrl,
        shortUrl,
        ownerId: session.user.id,
      },
    });
  });
