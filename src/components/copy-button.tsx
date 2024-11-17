import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { ComponentProps, Fragment, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface CopyButtonProps extends ComponentProps<typeof Button> {
  textCopySuccess: string
  text: string;
}

export function CopyButton({ text, textCopySuccess, ...rest }: CopyButtonProps): JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(textCopySuccess);
      setTimeout(() => setCopied(false), 1500);
    } catch(error) {
      setCopied(false);
      console.error(error)
      toast.error("Ocorreu uma falha ao tentar copiar!");
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="disabled:opacity-100 size-7"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            disabled={copied}
            icon={
              <Fragment>
                <div
                  className={cn(
                    "transition-all",
                    copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  )}
                >
                  <Check className="stroke-emerald-500 size-3.5" strokeWidth={3} aria-hidden="true" />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                  )}
                >
                  <Copy className="size-3.5" strokeWidth={3} aria-hidden="true"  />
                </div>  
              </Fragment>
            }
            {...rest}
          />
      
        </TooltipTrigger>
        <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
          Clique para Copiar
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    )
  
  // <Button size="icon" variant="outline" {...rest} icon={<Copy className="size-4" />} onClick={handleCopyUrl} />;
  
}