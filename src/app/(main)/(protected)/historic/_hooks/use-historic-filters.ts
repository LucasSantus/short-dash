import { parseAsArrayOf, parseAsInteger, parseAsJson, parseAsString, useQueryStates } from "nuqs";
import { z } from "zod";

const createdAtSchema = z.object({
  from: z.date(),
  to: z.date().optional(),
});

export function useHistoricFilters() {
  const [filters, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(10),
    linkIds: parseAsArrayOf(parseAsString).withDefault([]),
    userName: parseAsString.withDefault(""),
    createdAt: parseAsJson(createdAtSchema.parse).withDefault({
      from: new Date(),
    }),
  });

  return {
    filters,
    setFilters,
  };
}
