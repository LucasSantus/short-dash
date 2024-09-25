import { messages } from "@/constants/messages";
import { signInFormSchema } from "@/validation/auth/sign-in";
import { compare } from "bcryptjs";
import { publicProcedure } from "../../trpc";

export const signInMutation = publicProcedure
  .input(signInFormSchema)
  .mutation(async ({ input: { email, password }, ctx: { db } }) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error(messages.account.USER_NOT_FOUND);

    if (user.deletedAt) throw new Error("Este usuário foi deletado!");

    const account = await db.account.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!account) throw new Error(messages.account.ACCOUNT_NOT_FOUND);

    if (!user.hashedPassword) throw new Error("Ocorreu um problema ao tentar recuperar a Conta!");

    const passwordMatch = compare(password, user.hashedPassword);

    if (!passwordMatch) throw new Error("A Senha informada está incorreta!");

    return user;
  });
