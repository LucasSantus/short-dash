import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { HistoryIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";

interface LinkHistoricRowProps {
  linkId: string;
}

export function LinkHistoricRow({ linkId }: LinkHistoricRowProps): JSX.Element {
  const router = useRouter();
  const [isPendingRedirectHistoric, startRedirectHistoricTransition] = useTransition();

  return (
    <DropdownMenuItem
      onSelect={async (event) => {
        event.preventDefault();

        startRedirectHistoricTransition(() => router.push(`/historic?linkIds=${linkId}`));
      }}
      className="flex items-center gap-2"
      icon={
        isPendingRedirectHistoric ? <Loader2Icon className="size-4 animate-spin" /> : <HistoryIcon className="size-4" />
      }
      disabled={isPendingRedirectHistoric}
    >
      Historico
    </DropdownMenuItem>
  );
}
