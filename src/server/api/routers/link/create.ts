import { createNewCode } from "@/utils/create-new-code";
import { linkSchema } from "@/validation/main/link";
import { protectedProcedure } from "../../trpc";

export const createLinkMutation = protectedProcedure
  .input(linkSchema)
  .mutation(async ({ input: { title, description, originalUrl }, ctx: { db, session } }) => {
    let code: string;
    let isUniqueCode: boolean;

    const titleIfExists = await db.link.findFirst({
      where: { title, ownerId: session.user.id },
    });

    if (titleIfExists) throw new Error("Um link com este título já existe. Por favor, escolha um título diferente.");

    do {
      code = createNewCode();

      const codeIfExists = await db.link.findUnique({
        where: { code },
      });

      isUniqueCode = !!codeIfExists;
    } while (isUniqueCode);

    await db.link.create({
      data: {
        title,
        description,
        code,
        clicks: 0,
        originalUrl,
        ownerId: session.user.id,
      },
    });
  });
