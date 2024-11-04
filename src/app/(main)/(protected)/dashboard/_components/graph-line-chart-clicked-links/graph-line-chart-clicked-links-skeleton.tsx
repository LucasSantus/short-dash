import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export function GraphLineChartClickedLinksSkeleton(): JSX.Element {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Clicks</CardTitle>
        </div>
        <div className="flex items-center gap-2 p-3">
          <Fragment>
            <Skeleton className="h-10 w-40" />

            <Skeleton className="h-10 w-36" />
          </Fragment>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="aspect-auto h-72 w-full flex-1">
          <Skeleton className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
