import { NumberTicker } from "@/components/number-ticker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { generateUrl } from "@/utils/generate-url";
import type { LinkStatus } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, CalendarIcon, ExternalLinkIcon, EyeIcon, Users } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { type LinkTableColumns, getLinkStatusDescription } from "../table-columns";

interface CategoryDetailsRowProps {
  link: LinkTableColumns;
}

export function LinkDetailsRow({ link }: CategoryDetailsRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "-";

    return format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  };

  const statusColor: Record<LinkStatus, string> = {
    Active: "bg-green-500",
    Inactive: "bg-yellow-500",
    Expired: "bg-red-500",
  };

  async function handleCopyUrl(copyUrl: string) {
    try {
      await navigator.clipboard.writeText(copyUrl);
      toast.success("Url copiada com sucesso!");
    } catch {
      toast.error("Ocorreu uma falha ao tentar copiar a url!");
    }
  }

  const shortUrl = generateUrl(link.code);

  return (
    <Fragment>
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
        className="flex items-center gap-2"
        icon={<EyeIcon className="size-4" />}
      >
        Ver Detalhes
      </DropdownMenuItem>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Link</DialogTitle>
            <DialogDescription>
              Revise as informações detalhadas do link selecionado. Aqui você pode visualizar o status atual, data de
              criação, últimas atualizações e outras propriedades essenciais.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-80 rounded-md border">
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={cn(statusColor[link.status], "text-foreground")}>
                        {getLinkStatusDescription[link.status].label}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Users className="size-4" />
                        {link.amountOfAccesses > 0 ? <NumberTicker value={link.amountOfAccesses} /> : 0}
                        <span className="mr-2">Acesso(s)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-semibold text-base">Descrição</span>
                      <p className="text-muted-foreground text-sm">{link.description || "-"}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <span className="font-semibold text-base">URLs</span>
                      <div className="grid gap-2">
                        <div className="grid space-y-2 text-sm">
                          <span className="font-semibold text-muted-foreground text-sm">URL Original:</span>
                          <div className="flex w-full">
                            <div
                              className="flex max-w-xl flex-1 cursor-pointer items-center truncate rounded-s-md rounded-e-none bg-muted p-2 font-mono text-muted-foreground text-sm"
                              onClick={() => handleCopyUrl(link.originalUrl)}
                            >
                              {link.originalUrl}
                            </div>
                            <Link href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                              <Button
                                className="rounded-s-none"
                                size="icon"
                                variant="outline"
                                icon={<ExternalLinkIcon className="size-4" />}
                              />
                            </Link>
                          </div>
                        </div>

                        <div className="grid space-y-2 text-sm">
                          <span className="font-semibold text-muted-foreground text-sm">URL Encurtada:</span>
                          <div className="flex w-full">
                            <div
                              className="flex max-w-xl flex-1 cursor-pointer items-center truncate rounded-s-md rounded-e-none bg-muted p-2 font-mono text-muted-foreground text-sm"
                              onClick={() => handleCopyUrl(shortUrl)}
                            >
                              {shortUrl}
                            </div>
                            <Link href={shortUrl} target="_blank" rel="noopener noreferrer">
                              <Button
                                className="rounded-s-none"
                                size="icon"
                                variant="outline"
                                icon={<ExternalLinkIcon className="size-4" />}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="max-w-xl space-y-2">
                      <span className="font-semibold text-base">Código</span>
                      <p className="rounded bg-muted p-2 font-mono text-muted-foreground text-sm">{link.code}</p>
                    </div>

                    <Separator />
                    <div className="grid gap-2 text-sm">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="size-4" />
                          <span>Criado em:</span>
                        </div>

                        <span className="text-muted-foreground">{formatDate(link.createdAt)}</span>
                      </div>

                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4" />
                          <span>Atualizado em:</span>
                        </div>

                        <span className="text-muted-foreground">{formatDate(link.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
