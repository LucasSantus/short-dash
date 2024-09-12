import { messages } from "@/constants/messages";
import { EmailResetPassword } from "@/emails/reset-password";
import { env } from "@/env";
import { resend } from "@/lib/resend";
import generateHash from "@/utils/hash";
import { forgetPasswordFormSchema } from "@/validation/auth/forget-password";
import { publicProcedure } from "../../trpc";

export const forgetPasswordRoute = publicProcedure
  .input(forgetPasswordFormSchema)
  .mutation(async ({ input: { email }, ctx: { db } }) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.name)
      throw new Error(messages.account.EMAIL_DONT_REGISTERED_ON_SYSTEM);

    await db.verificationToken.deleteMany({
      where: {
        user: {
          email,
        },
      },
    });

    const passwordResetExpires = Date.now() + 60 * 60 * 10;
    const resetToken = generateHash.randomBytes();
    const passwordResetToken = generateHash.createHash(resetToken);

    const verificationToken = await db.verificationToken.create({
      data: {
        token: passwordResetToken,
        expires: new Date(passwordResetExpires),
        userId: user.id,
        identifier: "reset-password",
      },
    });

    if (!verificationToken)
      throw new Error("Ops, ocorreu um erro na criação do token!");

    const url = env.NEXTAUTH_URL + "/reset-password/" + resetToken;

    resend.emails.send({
      from: env.RESEND_TO_EMAIL,
      to: email,
      subject: "Recuperação de Senha",
      react: EmailResetPassword({
        applicationName: "Short Dash",
        username: user.name,
        url,
      }),
    });
  });
