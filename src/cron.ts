import chalk from "chalk";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import cron from "node-cron";

declare global {
  var cronInitialized: boolean | undefined;
}

export function startCronJob() {
  if (global.cronInitialized) {
    return;
  }

  global.cronInitialized = true;

  cron.schedule("*/30 * * * *", async () => {
    const start = Date.now();
    const formattedDate = format(start, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

    console.info(
      chalk.blue(`\n [CRON] - Início:`) + chalk.cyan(` Sincronização de informações iniciada às ${formattedDate}.`)
    );

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cron/sync`, { method: "GET" });

      const end = Date.now();
      const duration = end - start;

      console.info(
        chalk.green(`\n [CRON] - Concluído:`) +
          chalk.cyan(
            ` Sincronização concluída com sucesso em ${duration}ms às ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}.`
          )
      );
    } catch (error) {
      console.error(
        `${
          chalk.red(`\n [CRON] - Erro:`) +
          chalk.cyan(
            ` Falha ao executar o cron job às ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}.`
          )
        }\n${chalk.gray(error)}`
      );
    }
  });
}
