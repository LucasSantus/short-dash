"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
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
      <CardContent className="grid flex-1 gap-8">
        <Table>
          <TableBody>
            <ListMostClickedLinks />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
