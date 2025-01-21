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

  cron.schedule("*/5 * * * *", async () => {
    const start = Date.now();
    const formattedDate = format(start, "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR });

    console.info(
      chalk.blue(`\n[CRON] - Início: `) + chalk.cyan(`Sincronização de informações iniciada às ${formattedDate}.\n`)
    );

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cron/sync`, {
        method: "GET",
      });

      const data = await response.json();

      const end = Date.now();
      const duration = end - start;

      if (data.message) {
        console.info(chalk.blue(`\n[CRON] - Finalizado: `) + chalk.cyan(`${data.message}`));
      }

      console.info(
        chalk.green(`\n[CRON] - Concluído: `) +
          chalk.cyan(
            `Sincronização dos dados foi concluída com sucesso em ${duration}ms às ${format(new Date(), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}.\n`
          )
      );
    } catch (error) {
      console.error(
        `${
          chalk.red(`\n[CRON] - Falha: `) +
          chalk.cyan(
            `Ocorreu uma falha ao tentar executar o cron job às ${format(new Date(), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}.\n`
          )
        }\n${chalk.gray(error)}`
      );
    }
  });
}
