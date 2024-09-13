"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DontHaveItems } from "@/components/dont-have-items";
import QueryFailed from "@/components/query-failed";
import { trpc } from "@/trpc/client";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { LinkTable } from "./_components/table";
import { CreateCategoryDialog } from "./_components/table/form/create-link-dialog";
import type { LinkStatus } from "./_types/links";

export function LinkList(): JSX.Element {
  const [filters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(10),

    title: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });

  const statuses = filters.status ? filters.status.split(".") : [];

  const { data, isLoading, isError, refetch } = trpc.link.getLinksQuery.useQuery({
    pagination: {
      page: filters.page,
      pageSize: filters.per_page,
    },
    search: {
      title: filters.title,
    },
    statuses: statuses as LinkStatus[],
  });

  if (isLoading)
    return <DataTableSkeleton columnCount={6} rowCount={10} searchableColumnCount={1} filterableColumnCount={1} />;

  if (isError || !data) return <QueryFailed refetch={refetch} isLoading={isLoading} />;

  if (!filters.title && !data.links.length)
    return (
      <DontHaveItems
        title="Você não tem links registrados no momento."
        description="Para começar a gerenciar seus links, adicione um novo link."
      >
        <CreateCategoryDialog />
      </DontHaveItems>
    );

  return <LinkTable data={data.links} pageCount={data.pagination.pageCount} totalCount={data.pagination.totalCount} />;
}
