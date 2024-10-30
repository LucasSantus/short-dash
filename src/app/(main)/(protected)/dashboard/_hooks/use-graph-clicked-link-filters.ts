import { endOfMonth, startOfMonth } from "date-fns";
import { parseAsIsoDateTime, parseAsString, useQueryStates } from "nuqs";

export function useGraphClickedLinkFilters(linkId: string) {
  const today = new Date();

  const [filters, setFilters] = useQueryStates({
    createdAtFrom: parseAsIsoDateTime.withDefault(startOfMonth(today)),
    createdAtTo: parseAsIsoDateTime.withDefault(endOfMonth(today)),

    linkId: parseAsString.withDefault(linkId ?? ""),
  });

  return {
    filters,
    setFilters,
  };
}
