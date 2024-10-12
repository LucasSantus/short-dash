import { z } from "zod";
import { useFilters } from "../use-filters";

export const linkFiltersSchema = z.object({
  page: z.number(),
  pageSize: z.number(),

  title: z.string().nullish(),
  status: z.string().nullish(),
});

export type LinkFiltersSchema = z.input<typeof linkFiltersSchema>;

const defaultValues: LinkFiltersSchema = {
  page: 1,
  pageSize: 10,

  title: undefined,
  status: undefined,
};

export function useLinksFilters() {
  return useFilters(linkFiltersSchema, defaultValues);
}
