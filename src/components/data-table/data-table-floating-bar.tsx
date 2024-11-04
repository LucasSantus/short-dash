import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import * as React from "react";
import { ReactNode } from "react";

interface DataTableFloatingBarProps<TData> {
  table: Table<TData>;
  children: ReactNode;
}

export function DataTableFloatingBar<TData>({ table, children }: DataTableFloatingBarProps<TData>): JSX.Element {
  const rows = table.getFilteredSelectedRowModel().rows;

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        table.toggleAllRowsSelected(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [table]);

  return (
    <TooltipProvider>
      <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-fit px-4">
        <div className="w-full overflow-x-auto">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
            <div className="flex h-7 items-center rounded-sm border border-dashed">
              <span className="whitespace-nowrap px-2 text-xs">{rows.length} Selecionado(s)</span>
              <Separator orientation="vertical" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mx-[1px] size-6 rounded-[2px]"
                    onClick={() => table.toggleAllRowsSelected(false)}
                    icon={<XIcon className="size-4" />}
                  />
                </TooltipTrigger>
                <TooltipContent className="flex items-center border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900">
                  <p className="mr-2">Limpar seleção</p>
                  <Kbd abbrTitle="Escape" variant="outline">
                    Esc
                  </Kbd>
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator orientation="vertical" className="hidden h-5 sm:block" />
            <div className="flex items-center gap-1.5">{children}</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
