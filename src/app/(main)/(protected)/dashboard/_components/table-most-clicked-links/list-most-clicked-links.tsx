import { MAX_POPULAR_LINKS } from "@/constants/globals";

import QueryFailed from "@/components/query-failed";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { trpc } from "@/trpc/client";
import { Fragment } from "react";

export function ListMostClickedLinks(): JSX.Element {
  const { data, isLoading, isFetching, refetch, isError, error } = trpc.link.mostClickeds.useQuery();

  if (isLoading)
    return (
      <Fragment>
        {Array.from({ length: MAX_POPULAR_LINKS }).map((_, index) => (
          <TableRow key={index}>
            <TableCell colSpan={2} className="py-1 px-0 rounded-sm">
              <Skeleton className="w-full h-10 rounded-sm" />
            </TableCell>
          </TableRow>
        ))}
      </Fragment>
    );

  if (isError || !data) return <QueryFailed isFetching={isFetching} refetch={refetch} error={error} />;

  return (
    <Fragment>
      {data?.data.map(({ id, title, amountOfAccesses }) => (
        <TableRow key={id}>
          <TableCell className="font-medium">{title}</TableCell>
          <TableCell className="text-right">{amountOfAccesses}</TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
}
