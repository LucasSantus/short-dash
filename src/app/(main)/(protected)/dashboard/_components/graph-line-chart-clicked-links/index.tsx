"use client";

import QueryFailed from "@/components/query-failed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiSelectOption } from "@/components/ui/multi-select";
import { trpc } from "@/trpc/client";
import { GraphLineChartClicked } from "./graph-line-chart-clicked";
import { GraphLineChartClickedFilters } from "./graph-line-chart-clicked-filters";
import { GraphLineChartClickedLinksSkeleton } from "./graph-line-chart-clicked-links-skeleton";

export function GraphLineChartClickedLinks(): JSX.Element {
  const {
    data: allLinkListOptionsData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = trpc.link.allLinkListOptions.useQuery();

  if (isLoading) return <GraphLineChartClickedLinksSkeleton />;

  if (isError || !allLinkListOptionsData?.data)
    return (
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Clicks</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <QueryFailed error={error} isFetching={isFetching} refetch={refetch} />
        </CardContent>
      </Card>
    );

  const initialDataFiltered: MultiSelectOption | undefined = allLinkListOptionsData.data[0] ?? undefined;

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Clicks</CardTitle>
        </div>
        <div className="flex items-center gap-2 p-3">
          <GraphLineChartClickedFilters
            data={allLinkListOptionsData.data ?? []}
            initialDataFiltered={initialDataFiltered}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <GraphLineChartClicked initialDataFiltered={initialDataFiltered} />
      </CardContent>
    </Card>
  );
}
