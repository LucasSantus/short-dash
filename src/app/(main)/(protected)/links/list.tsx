"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DontHaveItems } from "@/components/dont-have-items";
import QueryFailed from "@/components/query-failed";
import { trpc } from "@/trpc/client";
import { LinkTable } from "./_components/table";
import { CreateCategoryDialog } from "./_components/table/form/create-link-dialog";
import { getLinkColumns } from "./_components/table/table-columns";
import { useLinkFilters } from "./_hooks/use-link-filters";

export function LinkList(): JSX.Element {
  const { page, pageSize, title, statuses } = useLinkFilters();

  const columns = getLinkColumns();

  const { data, isLoading, isFetching, refetch, isError, error } = trpc.link.list.useQuery({
    pagination: {
      page,
      pageSize,
    },
    search: {
      title,
      statuses,
    },
  });

  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={columns.length}
        rowCount={pageSize}
        searchableColumnCount={1}
        filterableColumnCount={1}
      />
    );

  if (isError || !data) return <QueryFailed refetch={refetch} isFetching={isFetching} error={error} />;

  if (!title && !data.links.length)
    return (
      <DontHaveItems
        title="Você não tem links registrados no momento."
        description="Para começar a gerenciar seus links, adicione um novo link."
      >
        <CreateCategoryDialog />
      </DontHaveItems>
    );

  return <LinkTable links={data.links} pageCount={data.pagination.pageCount} totalCount={data.pagination.totalCount} />;
}
