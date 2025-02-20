import { application } from "@/config/metadata";
import { messages } from "@/constants/messages";
import { EmailResetPassword } from "@/emails/reset-password";
import { env } from "@/env";
import { resend } from "@/lib/resend";
import { createNewCode } from "@/utils/create-new-code";
import { forgetPasswordFormSchema } from "@/validation/auth/forget-password";
import { addHours } from "date-fns";
import { publicProcedure } from "../../trpc";

export const forgetPasswordMutation = publicProcedure
  .input(forgetPasswordFormSchema)
  .mutation(async ({ input: { email }, ctx: { db } }) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.name) throw new Error(messages.globals.email.dontRegisteredOnSystem);

    const account = await db.account.findFirst({
      where: {
        userId: user.id,
        type: "credentials",
      },
    });

    if (!account) {
      throw new Error(
        "O usuário atual não possuí este método de autenticação, portanto, não é possível recuperar esta conta. Para mais informações, entre em contato com a administração!"
      );
    }

    await db.verificationToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const passwordResetExpires = addHours(new Date(), 24);

    const token = createNewCode();

    const verificationToken = await db.verificationToken.create({
      data: {
        token,
        expires: passwordResetExpires,
        userId: user.id,
        identifier: "forget-password",
      },
    });

    if (!verificationToken)
      throw new Error(
        "Ocorreu um problema ao tentar recuperar o token de verificação. Por favor, tente novamente mais tarde."
      );

    const url = `${env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    await resend.emails.send({
      from: env.RESEND_TO_EMAIL,
      to: email,
      subject: "Recuperação de Senha",
      react: EmailResetPassword({
        applicationName: application.name,
        username: user.name,
        url,
      }),
    });
  });
