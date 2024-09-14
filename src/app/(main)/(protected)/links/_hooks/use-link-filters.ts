import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { LinkStatus } from "../_types/links";

export function useLinkFilters() {
  const [{ per_page, status, ...rest }] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(10),
    title: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });

  const statuses = status ? status.split(".") : [];

  return {
    ...rest,
    pageSize: per_page,
    statuses: statuses as LinkStatus[],
  };
}
