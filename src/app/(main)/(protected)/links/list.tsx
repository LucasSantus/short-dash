"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import QueryFailed from "@/components/query-failed";
import { trpc } from "@/trpc/client";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { LinkStatus } from "./_types/links";
import { LinkTable } from "./table";

export function ListLinks(): JSX.Element {
  const [filters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(10),

    title: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });

  const statuses = filters.status ? filters.status.split(".") : [];

  const { data, isLoading, isError, refetch } = trpc.link.getLinks.useQuery({
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
    return (
      <DataTableSkeleton
        columnCount={5}
        rowCount={filters.per_page}
        searchableColumnCount={1}
        filterableColumnCount={1}
      />
    );

  if (isError || !data)
    return <QueryFailed refetch={refetch} isLoading={isLoading} />;

  // return (
  //   <div className="mt-2 flex flex-1 items-center justify-center rounded-lg border-2 border-dashed shadow-sm">
  //     <div className="flex flex-col items-center gap-1 text-center">
  //       <h3 className="text-2xl font-bold tracking-tight">
  //         Voce não tem links registrados
  //       </h3>
  //       <p className="text-sm text-muted-foreground">
  //         Pode começar a gerencia-los assim que adicionar um novo link.
  //       </p>
  //       <Button className="mt-4">Adicionar novo link</Button>
  //       <CreateCategoryDialog />
  //     </div>
  //   </div>
  // );

  console.log({ data });

  return (
    <LinkTable
      links={data.links}
      pageCount={data.pagination.pageCount}
      totalCount={data.pagination.totalCount}
    />
  );
}
