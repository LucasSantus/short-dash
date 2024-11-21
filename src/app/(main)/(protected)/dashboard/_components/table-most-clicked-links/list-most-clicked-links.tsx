import { NumberTicker } from "@/components/number-ticker";
import QueryFailed from "@/components/query-failed";
import { Skeleton } from "@/components/ui/skeleton";
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
          <div className="flex h-14 items-center border-b px-2" key={index}>
            <Skeleton className="h-10 w-full rounded-sm" />
          </div>
        ))}
      </Fragment>
    );

  if (isError || !mostClickedLinks) return <QueryFailed isFetching={isFetching} refetch={refetch} error={error} />;

  if (!mostClickedLinks.data.length)
    return <div className="mt-5 text-center text-muted-foreground">{messages.globals.data.noData}</div>;

  return (
    <Fragment>
      {mostClickedLinks.data.map(({ id, title, amountOfAccesses }) => (
        <div key={id} className="flex h-14 items-center border-b px-2">
          <div className="w-52 truncate md:w-full lg:w-40 xl:w-56">{title}</div>

          <div className="ml-auto">
            {amountOfAccesses > 0 ? <NumberTicker value={amountOfAccesses} className="text-sm" /> : 0}
          </div>
        </div>
      ))}
    </Fragment>
  );
}
