"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { trpc } from "@/trpc/client";
import { RefreshCcwIcon } from "lucide-react";
import { toast } from "sonner";

export function LinkTableRefetching(): JSX.Element {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.link.refetching.useMutation({
    onSuccess: async () => {
      await utils.link.invalidate();

      toast.success("Informações atualizadas com sucesso!");
    },
    onError: () => toast.success("Ocorreu um problema ao tentar atualizar as informações, tente novamente mais tarde!"),
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
