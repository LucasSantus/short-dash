import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useHistoricFilters() {
  const [filters, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(10),

    linkIds: parseAsArrayOf(parseAsString).withDefault([]),
    userName: parseAsString.withDefault(""),
  });

  return {
    filters,
    setFilters,
  };
}
