import { messages } from "@/constants/messages";
import { signUpFormSchema } from "@/validation/auth/sign-up";
import bcrypt from "bcryptjs";
import { publicProcedure } from "../../trpc";

export const signUpRoute = publicProcedure
  .input(signUpFormSchema)
  .mutation(async ({ input: { name, email, password }, ctx: { db } }) => {
    const emailExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists)
      throw new Error(messages.account.EMAIL_REGISTERED_ON_SYSTEM);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    if (!user) throw new Error("erro ao criar novo usuário");

    const newAccount = await db.account.create({
      data: {
        type: "credentials",
        provider: "Credentials",
        providerAccountId: crypto.randomUUID(),
        userId: user.id,
      },
    });

    if (!newAccount) throw new Error("erro ao criar nova conta");

    return newAccount;
  });
