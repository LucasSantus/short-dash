"use client";

import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/utils/get-api-error-message";

export interface QueryFailedProps {
  refetch?: () => void;
  isFetching?: boolean;
  error?: unknown;
}

export default function QueryFailed({ refetch, isFetching, error }: QueryFailedProps) {
  const errorMessage = getApiErrorMessage(error);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <h2 className="text-center text-sm font-medium text-red-600">{errorMessage}</h2>

      {refetch ? (
        <Button onClick={refetch} isLoading={isFetching}>
          Tentar Novamente
        </Button>
      ) : null}
    </div>
  );
}
