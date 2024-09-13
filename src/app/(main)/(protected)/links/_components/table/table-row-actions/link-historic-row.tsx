import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { HistoryIcon, Loader2Icon } from "lucide-react";
import { useTransition } from "react";

interface LinkHistoricRowProps {
  linkId: string;
}

export function LinkHistoricRow({ linkId }: LinkHistoricRowProps): JSX.Element {
  const router = useCustomRouter();
  const [isPendingRedirectHistoric, startRedirectHistoricTransition] = useTransition();

  return (
    <DropdownMenuItem
      onSelect={(event) => {
        event.preventDefault();

        startRedirectHistoricTransition(() => router.push(`/links/${linkId}/historic`));
      }}
      className="flex items-center gap-2"
      icon={
        isPendingRedirectHistoric ? <Loader2Icon className="size-4 animate-spin" /> : <HistoryIcon className="size-4" />
      }
    >
      Historico
    </DropdownMenuItem>
  );
}
