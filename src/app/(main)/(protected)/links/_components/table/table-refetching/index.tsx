"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { trpc } from "@/trpc/client";
import { RefreshCcwIcon } from "lucide-react";

export function LinkTableRefetching(): JSX.Element {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.link.refetching.useMutation({
    onSettled: async () => {
      await utils.link.invalidate();
    },
  });

  async function onHandleSubmit() {
    mutate();
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            icon={<RefreshCcwIcon className="size-4" />}
            isLoading={isPending}
            onClick={onHandleSubmit}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Sincronizar Informações</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
