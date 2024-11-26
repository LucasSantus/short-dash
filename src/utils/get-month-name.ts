import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function getMonthName(monthNumber: number): string {
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error("O número do mês deve estar entre 1 e 12.");
  }

  const date = new Date(2024, monthNumber - 1, 1);

  return format(date, "MMMM", { locale: ptBR });
}
