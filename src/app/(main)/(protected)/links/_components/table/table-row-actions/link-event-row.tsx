import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { HistoryIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";

interface LinkEventRowProps {
  linkId: string;
}

export function LinkEventRow({ linkId }: LinkEventRowProps): JSX.Element {
  const router = useRouter();
  const [isPendingRedirect, startRedirectTransition] = useTransition();

  return (
    <DropdownMenuItem
      onSelect={async (event) => {
        event.preventDefault();

        startRedirectTransition(() => router.push(`/events?linkIds=${linkId}`));
      }}
      className="flex items-center gap-2"
      icon={isPendingRedirect ? <LoaderIcon className="size-4 animate-spin" /> : <HistoryIcon className="size-4" />}
      disabled={isPendingRedirect}
    >
      Ver Historico
    </DropdownMenuItem>
  );
}
