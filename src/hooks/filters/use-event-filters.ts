import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from "nuqs";

// export const eventFiltersSchema = z.object({
//   page: z.number(),
//   pageSize: z.number(),
//   username: z.string().nullish(),

//   createdAt: z
//     .object({
//       from: z.date(),
//       to: z.date().optional(),
//     })
//     .nullish(),

//   linkIds: z.array(z.string()).default([]).optional(),
// });

// export type EventFiltersSchema = z.input<typeof eventFiltersSchema>;

// const defaultValues: EventFiltersSchema = {
//   page: 1,
//   pageSize: 10,

//   username: undefined,
//   createdAt: undefined,

//   linkIds: [],
// };

// export function useEventFilters() {
//   return useFilters(eventFiltersSchema, defaultValues);
// }

export function useEventFilters() {
  const [filters, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),

    username: parseAsString.withDefault(""),
    createdAtFrom: parseAsString.withDefault(""),
    createdAtTo: parseAsString.withDefault(""),

    linkIds: parseAsArrayOf(parseAsString).withDefault([]),
  });

  return {
    filters,
    setFilters,
  };
}
