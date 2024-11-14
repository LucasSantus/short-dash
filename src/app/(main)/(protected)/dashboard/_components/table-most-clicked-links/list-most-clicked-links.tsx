import { NumberTicker } from "@/components/number-ticker";
import QueryFailed from "@/components/query-failed";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { MAX_POPULAR_LINKS } from "@/constants/globals";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { Fragment } from "react";

export function ListMostClickedLinks(): JSX.Element {
  const { data: mostClickedLinks, isLoading, isFetching, refetch, isError, error } = trpc.link.mostClickeds.useQuery();

  if (isLoading)
    return (
      <Fragment>
        {Array.from({ length: MAX_POPULAR_LINKS }).map((_, index) => (
          <TableRow key={index}>
            <TableCell colSpan={2} className="rounded-sm px-0 py-1">
              <Skeleton className="h-10 w-full rounded-sm" />
            </TableCell>
          </TableRow>
        ))}
      </Fragment>
    );

  if (isError || !mostClickedLinks) return <QueryFailed isFetching={isFetching} refetch={refetch} error={error} />;

  return (
    <Fragment>
      {mostClickedLinks.data.length ? (
        mostClickedLinks.data.map(({ id, title, amountOfAccesses }) => (
          <TableRow key={id} className="border-b">
            <TableCell className="font-medium">
              <div className="w-52 truncate md:w-full lg:w-40 xl:w-56">{title}</div>
            </TableCell>
            <TableCell className="text-right">
              {amountOfAccesses > 0 ? <NumberTicker value={amountOfAccesses} className="text-sm" /> : 0}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell className="font-medium" colSpan={2}>
            <div className="flex w-full items-center justify-center">
              <span className="text-muted-foreground">{messages.globals.data.noData}</span>
            </div>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}
