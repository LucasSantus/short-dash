import cron from "node-cron";
import chalk from "chalk";

declare global {
  var cronInitialized: boolean | undefined;
}

export function startCronJob() {
  if (global.cronInitialized) {
    return;
  }

  global.cronInitialized = true;

  cron.schedule("*/10 * * * *", async () => {
    const start = Date.now();
    const timestamp = new Date().toISOString();

    console.info(
      chalk.blue(`[CRON] - Início:`) +
        chalk.cyan(` Sincronização de informações iniciada às ${timestamp}.`)
    );

    try {
      await fetch("http://localhost:3000/api/cron/sync", { method: "GET" });

      const end = Date.now();
      const duration = end - start;

      console.info(
        chalk.green(`[CRON] - Concluído:`) +
          chalk.cyan(` Sincronização concluída com sucesso em ${duration}ms às ${new Date().toISOString()}.`)
      );
    } catch (error) {
      console.error(
        `${chalk.red(`[CRON] - Erro:`) +
          chalk.cyan(` Falha ao executar o cron job às ${new Date().toISOString()}.`)}\n${chalk.gray(error)}`
      );
    }
  });
}
