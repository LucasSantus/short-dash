"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { trpc } from "@/trpc/client";
import { useState } from "react";
import { DashboardFilteredTrigger } from "./dashboard-filtered-trigger";
import { DashboardFilteredTriggerSkeleton } from "./dashboard-filtered-trigger-skeleton";
import { DashboardFilteredForm } from "./form";

interface DashboardFilteredProps {
  type: "calendar" | "link";
}

export function DashboardFiltered({ type }: DashboardFilteredProps): JSX.Element {
  const { data: linkOptions, isLoading } = trpc.link.allLinkListOptions.useQuery();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {isLoading ? (
        <DashboardFilteredTriggerSkeleton />
      ) : (
        <DashboardFilteredTrigger setIsOpen={setIsOpen} linkOptions={linkOptions?.data ?? []} type={type} />
      )}

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros Avançados</SheetTitle>
          <SheetDescription>Ajuste os critérios para refinar os resultados dos dados.</SheetDescription>
        </SheetHeader>
        <DashboardFilteredForm linkOptions={linkOptions?.data ?? []} setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}
