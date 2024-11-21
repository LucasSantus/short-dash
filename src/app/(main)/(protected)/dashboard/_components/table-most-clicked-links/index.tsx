"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MousePointerClickIcon } from "lucide-react";
import { ListMostClickedLinks } from "./list-most-clicked-links";

export function TableMostClickedLinks(): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Links Populares</span>

          <MousePointerClickIcon className="size-5" />
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="h-full">
        <ListMostClickedLinks />
      </CardContent>
    </Card>
  );
}
