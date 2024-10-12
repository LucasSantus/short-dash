"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import { Fragment } from "react";
import { GraphLineChartClicked } from "./graph-line-chart-clicked";
import { GraphLineChartClickedFilters } from "./graph-line-chart-clicked-filters";

export function GraphLineChartClickedLinks(): JSX.Element {
  const { data: allLinkListOptionsData, isLoading, isError } = trpc.link.allLinkListOptions.useQuery();

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Clicks</CardTitle>
        </div>
        <div className="flex items-center p-3 gap-2">
          {isLoading ? (
            <Fragment>
              <Skeleton className="w-40 h-10" />

              <Skeleton className="w-36 h-10" />
            </Fragment>
          ) : isError && !allLinkListOptionsData ? null : (
            <GraphLineChartClickedFilters data={allLinkListOptionsData!.data ?? []} />
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <GraphLineChartClicked />
      </CardContent>
    </Card>
  );
}
