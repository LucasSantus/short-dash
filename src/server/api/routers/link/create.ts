import { linkSchema } from "@/validation/main/link";
import { protectedProcedure } from "../../trpc";

export const createLinkMutation = protectedProcedure
  .input(linkSchema)
  .mutation(async ({ input: { title, description, code, originalUrl }, ctx: { db, session } }) => {
    const titleIfExists = await db.link.findFirst({
      where: { title, ownerId: session.user.id },
    });

    if (titleIfExists) throw new Error("Um link com este título já existe. Por favor, escolha um título diferente.");

    const codeIfExists = await db.link.findFirst({
      where: { code },
    });

    if (codeIfExists) throw new Error("Um link com este código já existe. Por favor, escolha um código diferente.");

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
