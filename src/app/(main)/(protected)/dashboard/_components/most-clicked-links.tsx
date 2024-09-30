"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function MostClickedLinks(): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Links Mais Clicados</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 flex-1">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Jackson Lee</TableCell>
              <TableCell className="text-right">+$39.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Jackson Lee</TableCell>
              <TableCell className="text-right">+$39.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Jackson Lee</TableCell>
              <TableCell className="text-right">+$39.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Jackson Lee</TableCell>
              <TableCell className="text-right">+$39.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
