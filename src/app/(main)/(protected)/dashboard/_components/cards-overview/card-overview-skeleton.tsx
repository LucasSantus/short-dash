import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export function CardOverviewSkeleton(): JSX.Element {
  return (
    <Fragment>
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <Skeleton className="h-5 w-32" />

            <Skeleton className="h-5 w-6" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </Fragment>
  );
}
