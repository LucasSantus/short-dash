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
import { useEventFilters } from "@/hooks/filters/use-event-filters";
import { FilterIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { EventFilteredSchema, EventTableFilteredForm } from "./form";

export function EventTableFiltered(): JSX.Element {
  const { filters, setFilters } = useEventFilters();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onSubmit({ createdAt, linkIds }: EventFilteredSchema) {
    setFilters({
      ...filters,

      page: 1,
      createdAt,
      linkIds,
    });

    setIsOpen(false);
  }

  function onHandleRemoveFilters() {
    setFilters({
      ...filters,
      page: 1,
      createdAt: undefined,
      linkIds: [],
    });

    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" icon={<SlidersHorizontalIcon className="size-4" />} className="size-9" />
      </SheetTrigger>
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
