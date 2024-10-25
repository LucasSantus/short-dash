import { endOfYear, startOfYear } from "date-fns";
import { parseAsIsoDateTime, parseAsString, useQueryStates } from "nuqs";

export function useGraphClickedLinkFilters(linkId?: string) {
  const today = new Date();

  const [filters, setFilters] = useQueryStates({
    createdAtFrom: parseAsIsoDateTime.withDefault(startOfYear(today)),
    createdAtTo: parseAsIsoDateTime.withDefault(endOfYear(today)),

    linkId: parseAsString.withDefault(linkId ?? ""),
  });

  return {
    filters,
    setFilters,
  };
}
