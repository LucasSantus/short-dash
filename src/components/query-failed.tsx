"use client";

import { Button } from "@/components/ui/button";

export interface QueryFailedProps {
  refetch?: () => void;
  isLoading?: boolean;
  error?: Error | null;
}

export default function QueryFailed({
  refetch,
  isLoading,
  error,
}: QueryFailedProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <h2 className="text-center text-sm font-medium text-red-600">
        {error ? error.message : "Ocorreu um erro inesperado!"}
      </h2>

      {refetch ? (
        <Button onClick={refetch} isLoading={isLoading}>
          Tentar Novamente
        </Button>
      ) : null}
    </div>
  );
}
