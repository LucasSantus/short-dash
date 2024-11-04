import { messages } from "@/constants/messages";
import { changePasswordFormSchema } from "@/validation/auth/change-password";
import bcrypt from "bcryptjs";
import { publicProcedure } from "../../trpc";

export const changePasswordMutation = publicProcedure
  .input(changePasswordFormSchema)
  .mutation(async ({ input: { email, password, oldPassword }, ctx: { db } }) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.password) throw new Error(messages.globals.user.notFound);

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) throw new Error("Sua senha antiga está incorreta!");

    const newPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { email },
      data: { password: newPassword },
    });

    return user;
  });
