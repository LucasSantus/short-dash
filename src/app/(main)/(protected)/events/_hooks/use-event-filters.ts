import { parseAsArrayOf, parseAsInteger, parseAsIsoDateTime, parseAsString, useQueryStates } from "nuqs";

export function useEventFilters() {
  const [filters, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),

    username: parseAsString.withDefault(""),
    createdAtFrom: parseAsIsoDateTime,
    createdAtTo: parseAsIsoDateTime,

    linkIds: parseAsArrayOf(parseAsString).withDefault([]),
  });

  return {
    filters,
    setFilters,
  };
}
