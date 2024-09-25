import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon, SlidersHorizontalIcon } from "lucide-react";
import { HistoricTableFilteredForm } from "./form";

export function HistoricTableFiltered(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" icon={<SlidersHorizontalIcon className="size-4" />} className="size-9" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros Avançados</SheetTitle>
          <SheetDescription>
            Ajuste os critérios para refinar os resultados do histórico de links. Após configurar, clique em "Aplicar
            Filtros".
          </SheetDescription>
        </SheetHeader>
        <HistoricTableFilteredForm>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" size="sm" icon={<FilterIcon className="size-4" />}>
                Aplicar Filtros
              </Button>
            </SheetClose>
          </SheetFooter>
        </HistoricTableFilteredForm>
      </SheetContent>
    </Sheet>
  );
}
