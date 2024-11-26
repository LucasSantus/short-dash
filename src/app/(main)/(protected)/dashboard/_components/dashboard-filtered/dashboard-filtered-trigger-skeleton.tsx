import { Skeleton } from "@/components/ui/skeleton";

export function DashboardFilteredTriggerSkeleton(): JSX.Element {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="size-10" />
    </div>
  );
}
