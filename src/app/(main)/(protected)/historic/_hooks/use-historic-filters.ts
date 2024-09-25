import { parseAsArrayOf, parseAsInteger, parseAsJson, parseAsString, useQueryStates } from "nuqs";
import { z } from "zod";

const dateSchema = z.object({
  createdAt: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
});

export function useHistoricFilters() {
  const [filters, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(10),
    linkIds: parseAsArrayOf(parseAsString).withDefault([]),
    userName: parseAsString.withDefault(""),
    date: parseAsJson(dateSchema.parse).withDefault({
      createdAt: {
        from: new Date(),
      },
    }),
  });

  return {
    filters,
    setFilters,
  };
}
