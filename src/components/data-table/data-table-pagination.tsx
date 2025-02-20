import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

const pageSizeOptions: number[] = [10, 20, 30, 40, 50];

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalCount: number;
}

export function DataTablePagination<TData>({ table, totalCount = 0 }: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div>
        <p className="whitespace-nowrap font-medium text-muted-foreground text-sm">
          Mostrando de {from} até {to} de {totalCount} resultados
        </p>
      </div>
      <div className="flex flex-col-reverse items-center gap-4 py-2 sm:flex-row sm:gap-5">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap font-medium text-sm">Linhas por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-9 w-[4.5rem]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center font-medium text-sm">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            size="icon"
            className="hidden size-9 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            icon={<ChevronsLeftIcon aria-hidden="true" />}
          />
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-9"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<ChevronLeftIcon aria-hidden="true" />}
          />
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-9"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={<ChevronRightIcon aria-hidden="true" />}
          />
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-9 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            icon={<ChevronsRightIcon aria-hidden="true" />}
          />
        </div>
      </div>
    </div>
  );
}
