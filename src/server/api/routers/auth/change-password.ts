import { messages } from "@/constants/messages";
import { changePasswordFormSchema } from "@/validation/auth/change-password";
import bcrypt from "bcryptjs";
import { publicProcedure } from "../../trpc";

export const changePasswordRoute = publicProcedure
  .input(changePasswordFormSchema)
  .mutation(
    async ({ input: { email, password, oldPassword }, ctx: { db } }) => {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user || !user.hashedPassword)
        throw new Error(messages.account.USER_NOT_FOUND);

      const passwordMatch = await bcrypt.compare(
        oldPassword,
        user.hashedPassword,
      );

      if (!passwordMatch) throw new Error("Sua senha antiga está incorreta!");

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.user.update({
        where: { email },
        data: { hashedPassword },
      });

      return user;
    },
  );
