"use client";

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DataTableFilterField } from "@/types/data-table";
import type { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { ReactNode, useMemo } from "react";

interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  filterFields?: DataTableFilterField<TData>[];
  getLabelColumns?: Record<keyof TData, string>;
  filterOptions?: ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
  children,
  className,
  getLabelColumns,
  filterOptions,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  return (
    <div className={cn("flex w-full items-center justify-between space-x-2 overflow-auto", className)} {...props}>
      <div className="flex items-center space-x-2 p-1">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : "") && (
                <Input
                  key={String(column.value)}
                  placeholder={column.placeholder}
                  value={(table.getColumn(String(column.value))?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn(String(column.value))?.setFilterValue(event.target.value)}
                  className="w-40 sm:w-60 lg:w-72"
                />
              )
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : "") && (
                <DataTableFacetedFilter
                  key={String(column.value)}
                  column={table.getColumn(column.value ? String(column.value) : "")}
                  title={column.label}
                  options={column.options ?? []}
                />
              )
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Remover filtros
            <XIcon className="size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}

        <DataTableViewOptions table={table} getLabelColumns={getLabelColumns} />

        {filterOptions}
      </div>
    </div>
  );
}
