import { messages } from "@/constants/messages";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const signUpMutation = publicProcedure
  .input(
    z.object({
      name: z
        .string({
          required_error: messages.globals.form.requiredField,
        })
        .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
        .trim(),
      email: z
        .string({
          required_error: messages.globals.form.requiredField,
        })
        .email({
          message: messages.globals.email.validEmail,
        })
        .trim(),
      password: z.string({
        required_error: messages.globals.form.requiredField,
      }),
    })
  )
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
        provider: "credentials",
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
