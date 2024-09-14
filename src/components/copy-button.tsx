import { Copy } from "lucide-react";
import { ComponentProps } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface CopyButtonProps extends ComponentProps<typeof Button> {
  copyUrl: string;
}

export function CopyButton({ copyUrl, ...rest }: CopyButtonProps): JSX.Element {
  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(copyUrl);
      toast.success("Url copiada com sucesso!");
    } catch {
      toast.error("Ocorreu uma falha ao tentar copiar a url!");
    }
  }

  return <Button size="icon" variant="outline" {...rest} icon={<Copy className="size-4" />} onClick={handleCopyUrl} />;
}
