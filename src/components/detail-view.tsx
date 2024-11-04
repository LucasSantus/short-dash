import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HelpCircleIcon } from "lucide-react";
import { PropsWithChildren } from "react";

interface DetailViewProps extends PropsWithChildren {
  className?: string;
}

function DetailView({ children }: DetailViewProps): JSX.Element {
  return (
    <TooltipProvider>
      <Tooltip>{children}</Tooltip>
    </TooltipProvider>
  );
}

function DetailViewTrigger({ children }: DetailViewProps): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      {children}
      <TooltipTrigger type="button" disabled>
        <HelpCircleIcon className="size-4 cursor-pointer text-muted-foreground" />
      </TooltipTrigger>
    </div>
  );
}

function DetailViewContent({ children, className }: DetailViewProps): JSX.Element {
  return (
    <TooltipContent className={cn("max-w-72 shadow-2xl", className)}>
      <p>{children}</p>
    </TooltipContent>
  );
}

export { DetailView, DetailViewContent, DetailViewTrigger };
