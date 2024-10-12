import { z } from "zod";
import { useFilters } from "../use-filters";

export const graphClickedLinkFiltersSchema = z.object({
  linkId: z.string().optional(),
});

export type GraphClickedLinkFiltersSchema = z.input<typeof graphClickedLinkFiltersSchema>;

const initialValues: GraphClickedLinkFiltersSchema = {
  linkId: undefined,
};

export function useGraphClickedLinkFilters(defaultValues?: GraphClickedLinkFiltersSchema) {
  return useFilters(graphClickedLinkFiltersSchema, defaultValues || initialValues);
}
