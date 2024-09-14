"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DontHaveItems } from "@/components/dont-have-items";
import QueryFailed from "@/components/query-failed";
import { trpc } from "@/trpc/client";
import { parseAsInteger, useQueryStates } from "nuqs";
import { HistoricTable } from "./_components/table";

interface HistoricListProps {
  linkId: string;
}

export function HistoricList({ linkId }: HistoricListProps): JSX.Element {
  const [filters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(10),
  });

  const { data, isLoading, isError, refetch } = trpc.historic.list.useQuery({
    linkId,
    pagination: {
      page: filters.page,
      pageSize: filters.per_page,
    },
  });

  if (isLoading)
    return <DataTableSkeleton columnCount={5} rowCount={10} searchableColumnCount={1} filterableColumnCount={1} />;

  if (isError || !data) return <QueryFailed refetch={refetch} isLoading={isLoading} />;

  if (!data.historic.length)
    return (
      <DontHaveItems
        title="Nenhum histórico registrado até o momento."
        description="Após a adição de um novo registro, você poderá começar a gerenciar o histórico associado."
      />
    );

  return (
    <HistoricTable data={data.historic} pageCount={data.pagination.pageCount} totalCount={data.pagination.totalCount} />
  );
}
