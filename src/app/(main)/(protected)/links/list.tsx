"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import QueryFailed from "@/components/query-failed";
import { trpc } from "@/trpc/client";
import { useSearchParams } from "next/navigation";
import { LinkTable } from "./table";

export function ListLinks(): JSX.Element {
  const params = useSearchParams();

  const page = params.get("page") ? Number(params.get("page")) : 1;
  const pageSize = params.get("per_page") ? Number(params.get("per_page")) : 10;
  const title = params.get("title") ?? "";

  const { data, isLoading, isError, refetch } = trpc.link.getLinks.useQuery({
    orderBy: "desc",
    pagination: {
      page,
      pageSize,
    },
    search: {
      title,
    },
  });

  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={5}
        // rowCount={pagination.pageSize}
        rowCount={10}
        searchableColumnCount={1}
        filterableColumnCount={1}
      />
    );

  if (isError || !data)
    return <QueryFailed refetch={refetch} isLoading={isLoading} />;

  return <LinkTable links={data.links} />;
}
