import { useEventFilters } from "@/app/(main)/(protected)/events/_hooks/use-event-filters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FilterIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { EventFilteredSchema, EventTableFilteredForm } from "./form";

export function EventTableFiltered(): JSX.Element {
  const { setFilters } = useEventFilters();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onSubmit(values: EventFilteredSchema) {
    const createdAtFrom = values.createdAt?.from ?? null;
    const createdAtTo = values.createdAt?.to ?? null;
    const linkIds = values.linkIds.length === 0 ? null : values.linkIds;

    setFilters({
      page: 1,
      createdAtFrom,
      createdAtTo,
      linkIds,
    });

    setIsOpen(false);
  }

  function onHandleRemoveFilters() {
    setFilters({
      page: 1,
      createdAtFrom: null,
      createdAtTo: null,
      linkIds: null,
      username: null,
    });

    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <SheetTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" icon={<SlidersHorizontalIcon className="size-4" />} />
            </TooltipTrigger>
          </SheetTrigger>
          <TooltipContent>
            <p>Visualizar Filtros Avançados</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros Avançados</SheetTitle>
          <SheetDescription>Ajuste os critérios para refinar os resultados do histórico de links.</SheetDescription>
        </SheetHeader>
        <EventTableFilteredForm onSubmit={onSubmit}>
          <SheetFooter>
            <Button
              size="sm"
              type="button"
              variant="secondary"
              icon={<XIcon className="size-4" />}
              className="h-9"
              onClick={onHandleRemoveFilters}
            >
              Remover Filtros
            </Button>

            <Button size="sm" icon={<FilterIcon className="size-4" />}>
              Aplicar Filtros
            </Button>
          </SheetFooter>
        </EventTableFilteredForm>
      </SheetContent>
    </Sheet>
  );
}
