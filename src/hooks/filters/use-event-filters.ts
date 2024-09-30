// import { z } from "zod";
// import { useFilters } from "../use-filters";

// export const eventFiltersSchema = z.object({
//   page: z.number(),
//   pageSize: z.number(),

//   username: z.string().optional(),
//   createdAt: z
//     .object({
//       from: z.date(),
//       to: z.date(),
//     })
//     .optional(),

//   linkIds: z.array(z.string()).optional(),
// });

// export type EventFiltersSchema = z.input<typeof eventFiltersSchema>;

// const defaultValues: EventFiltersSchema = {
//   page: 1,
//   pageSize: 10,

//   username: undefined,
//   linkIds: [],
//   createdAt: undefined,
// };

// export function useEventFilters() {
//   return useFilters(eventFiltersSchema, defaultValues);
// }

import { parseAsArrayOf, parseAsInteger, parseAsJson, parseAsString, useQueryStates } from "nuqs";
import { z } from "zod";

const createdAtSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export function useEventFilters() {
  const [filters, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),

    username: parseAsString.withDefault(""),
    createdAt: parseAsJson(createdAtSchema.parse),

    linkIds: parseAsArrayOf(parseAsString).withDefault([]),
  });

  return {
    filters,
    setFilters,
  };
}
