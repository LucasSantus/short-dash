import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export function CardOverviewSkeleton(): JSX.Element {
  return (
    <Fragment>
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
            <Skeleton className="w-32 h-5" />

            <Skeleton className="w-6 h-5" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="w-16 h-7" />
            <Skeleton className="w-full h-4" />
          </CardContent>
        </Card>
      ))}
    </Fragment>
  );
}
