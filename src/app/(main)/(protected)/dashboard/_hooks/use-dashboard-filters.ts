import { getMonth, getYear } from "date-fns";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useDashboardFilters() {
  const today = new Date();

  const [filters, setFilters] = useQueryStates({
    year: parseAsInteger.withDefault(getYear(today)),
    month: parseAsInteger.withDefault(getMonth(today) + 1),

    linkId: parseAsString,
  });

  return {
    filters,
    setFilters,
  };
}
