import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UrlStatus } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  CalendarIcon,
  ExternalLink,
  EyeIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { linkStatusDescription } from "../../_types/links";
import { LinkTableColumns } from "../table-columns";

interface CategoryDetailsRowProps {
  link: LinkTableColumns;
}

export function LinkDetailsRow({ link }: CategoryDetailsRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "-";

    return format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  };

  const statusColor: Record<UrlStatus, string> = {
    active: "bg-green-500",
    inactive: "bg-yellow-500",
  };

  return (
    <Fragment>
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
        className="flex items-center gap-2"
      >
        <EyeIcon className="size-4" />
        Ver Mais
      </DropdownMenuItem>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visualizar Link</DialogTitle>
            <DialogDescription>Link</DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-80 rounded-md border">
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`${statusColor[link.status]} text-foreground`}
                      >
                        {linkStatusDescription[link.status]}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Users className="size-4" />
                        <span>{link.numberOfVisitors} visitantes</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-base font-semibold">Descrição</span>
                      <p className="text-sm text-muted-foreground">
                        {link.description || "-"}
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <span className="text-base font-semibold">URLs</span>
                      <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4" />
                          <Link
                            href={link.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                          >
                            URL Original
                          </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4" />
                          <Link
                            href={link.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                          >
                            URL Encurtada
                          </Link>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <span className="text-base font-semibold">Código</span>
                      <p className="rounded bg-muted p-2 font-mono text-sm text-muted-foreground">
                        {link.code}
                      </p>
                    </div>

                    <Separator />

                    <div className="grid gap-2 text-sm">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="size-4" />
                          <span>Criado em:</span>
                        </div>

                        <span className="text-muted-foreground">
                          {formatDate(link.createdAt)}
                        </span>
                      </div>

                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4" />
                          <span>Atualizado em:</span>
                        </div>

                        <span className="text-muted-foreground">
                          {formatDate(link.updatedAt)}
                        </span>
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
