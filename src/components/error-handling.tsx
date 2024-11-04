"use client";

import { Button } from "@/components/ui/button";
import { messages } from "@/constants/messages";
import type { ErrorHandlingData } from "@/types/error-handling";
import { RefreshCcwIcon } from "lucide-react";
import { useEffect } from "react";

export default function ErrorHandling({ error, reset }: ErrorHandlingData) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const errorMessage = error?.message ?? messages.globals.error.errorNotFound;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <h2 className="text-center font-medium text-red-600 text-sm">{errorMessage}</h2>
      <Button onClick={() => reset()} icon={<RefreshCcwIcon className="size-4" />}>
        Tentar Novamente
      </Button>
    </div>
  );
}
