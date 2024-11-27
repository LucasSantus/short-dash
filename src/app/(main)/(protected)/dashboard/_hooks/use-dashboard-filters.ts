import { getYearsPerRange } from "@/utils/get-range-years";
import { getMonth, getYear } from "date-fns";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useDashboardFilters() {
  const today = new Date();

  const year = getYear(today);
  const month = getMonth(today) + 1;

  const years = getYearsPerRange();

  const [filters, setFilters] = useQueryStates({
    year: parseAsInteger.withDefault(year),
    month: parseAsInteger.withDefault(month),

    linkId: parseAsString,
  });

  if (filters.month < 1 || filters.month > 12) {
    setFilters({
      month,
    });
  }

  if (filters.year && !years.includes(filters.year)) {
    setFilters({
      year,
    });
  }

  return {
    filters,
    setFilters,
  };
}
