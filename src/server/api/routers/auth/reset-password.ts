import { messages } from "@/constants/messages";
import { resetPasswordFormSchema } from "@/validation/auth/reset-password";
import bcrypt from "bcryptjs";
import { publicProcedure } from "../../trpc";

export const resetPasswordMutation = publicProcedure
  .input(resetPasswordFormSchema)
  .mutation(async ({ input: { email, password }, ctx: { db } }) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error(messages.globals.email.dontRegisteredOnSystem);

    const hashedPassword = await bcrypt.hash(password, 10);

    await Promise.all([
      db.user.update({
        where: { email },
        data: { hashedPassword },
      }),
      db.verificationToken.deleteMany({
        where: {
          user: {
            email,
          },
        },
      }),
    ]);

    return user;
  });
