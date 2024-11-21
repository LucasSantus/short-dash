"use client";

import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export interface QueryFailedProps {
  refetch?: () => void;
  isFetching?: boolean;
  error?: unknown;
}

export default function QueryFailed({ refetch, isFetching, error }: QueryFailedProps) {
  const errorMessage = getApiErrorMessage(error);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-4">
      <Alert variant="destructive">
        <AlertCircleIcon className="size-4" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>

      {refetch ? (
        <Button onClick={refetch} isLoading={isFetching}>
          Tentar Novamente
        </Button>
      ) : null}
    </div>
  );
}
