import { messages } from "@/constants/messages";
import { signUpFormSchema } from "@/validation/auth/sign-up";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { publicProcedure } from "../../trpc";

export const signUpMutation = publicProcedure
  .input(signUpFormSchema)
  .mutation(async ({ input: { name, email, password }, ctx: { db } }) => {
    const emailExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: messages.globals.email.registeredOnSystem,
      });

    const newPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: newPassword,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Houve um problema ao tentar registrar o novo usuário. Tente novamente mais tarde.",
      });

    const newAccount = await db.account.create({
      data: {
        type: "credentials",
        provider: "Credentials",
        providerAccountId: crypto.randomUUID(),
        userId: user.id,
      },
    });

    if (!newAccount) {
      await db.user.delete({
        where: {
          id: user.id,
        },
      });

      throw new Error("Houve um problema ao tentar registrar a nova conta. Por favor, tente novamente mais tarde.");
    }

    return newAccount;
  });
