"use client";

import { Button } from "@/components/ui/button";
import { messages } from "@/constants/messages";
import type { ErrorHandlingData } from "@/types/error-handling";
import { RefreshCcwIcon, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function ErrorHandling({ error, reset }: ErrorHandlingData) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const errorMessage = error?.message ?? messages.globals.error.errorNotFound;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      {/* <h2 className="text-center font-medium text-red-600 text-sm"></h2> */}
      <Alert variant="destructive">
        <TriangleAlert className="size-4" />

        <AlertTitle>Atenção!</AlertTitle>

        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>

      {reset && (
        <Button onClick={() => reset()} icon={<RefreshCcwIcon className="size-4" />}>
          Tentar Novamente
        </Button>
      )}
    </div>
  );
}
