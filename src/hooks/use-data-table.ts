"use client";

import {
  type ColumnFiltersState,
  type PaginationState,
  type TableOptions,
  type VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import { z } from "zod";

import { useDebounce } from "@/hooks/use-debounce";
import type { DataTableFilterField } from "@/types/data-table";
import { useRouter } from "nextjs-toploader/app";

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      "pageCount" | "getCoreRowModel" | "manualFiltering" | "manualPagination" | "manualSorting"
    >,
    Required<Pick<TableOptions<TData>, "pageCount">> {
  /**
   * Defines filter fields for the table. Supports both dynamic faceted filters and search filters.
   * - Faceted filters are rendered when `options` are provided for a filter field.
   * - Otherwise, search filters are rendered.
   *
   * The indie filter field `value` represents the corresponding column name in the database table.
   * @default []
   * @type { label: string, value: keyof TData, placeholder?: string, options?: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[] }[]
   * @example
   * ```ts
   * // Render a search filter
   * const filterFields = [
   *   { label: "Title", value: "title", placeholder: "Search titles" }
   * ];
   * // Render a faceted filter
   * const filterFields = [
   *   {
   *     label: "Status",
   *     value: "status",
   *     options: [
   *       { label: "Todo", value: "todo" },
   *       { label: "In Progress", value: "in-progress" },
   *       { label: "Done", value: "done" },
   *       { label: "Canceled", value: "canceled" }
   *     ]
   *   }
   * ];
   * ```
   */
  filterFields?: DataTableFilterField<TData>[];

  /**
   * Enable notion like column filters.
   * Advanced filters and column filters cannot be used at the same time.
   * @default false
   * @type boolean
   */
  enableAdvancedFilter?: boolean;

  // initialState?: Omit<Partial<TableState>, "sorting"> & {
  //   sorting?: {
  //     id: Extract<keyof TData, string>;
  //     desc: boolean;
  //   }[];
  // };
}

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().optional(),
  // sort: z.string().optional(),
});

export function useDataTable<TData>({
  pageCount = -1,
  filterFields = [],
  enableAdvancedFilter = false,
  ...props
}: UseDataTableProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Search params
  const search = searchParamsSchema.parse(Object.fromEntries(searchParams));
  const page = search.page;
  const perPage = search.pageSize ?? props.initialState?.pagination?.pageSize ?? 10;
  // const sort =
  //   search.sort ??
  //   `${props.initialState?.sorting?.[0]?.id}.${props.initialState?.sorting?.[0]?.desc ? "desc" : "asc"}`;
  // const [column, order] = sort?.split(".") ?? [];

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Initial column filters
  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Array.from(searchParams.entries()).reduce<ColumnFiltersState>((filters, [key, value]) => {
      const filterableColumn = filterableColumns.find((column) => column.value === key);
      const searchableColumn = searchableColumns.find((column) => column.value === key);

      if (filterableColumn) {
        filters.push({
          id: key,
          value: value.split("."),
        });
      } else if (searchableColumn) {
        filters.push({
          id: key,
          value: [value],
        });
      }

      return filters;
    }, []);
  }, [filterableColumns, searchableColumns, searchParams]);

  // Table states
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialColumnFilters);

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: perPage,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  // Handle server-side sorting
  // const [sorting, setSorting] = React.useState<SortingState>([
  //   {
  //     id: column ?? "",
  //     desc: order === "desc",
  //   },
  // ]);

  React.useEffect(() => {
    router.replace(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        pageSize: pageSize,
        // sort: sorting[0]?.id
        //   ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
        //   : null,
      })}`,
      {
        scroll: false,
      }
    );
  }, [pageIndex, pageSize]);
  // }, [pageIndex, pageSize, sorting]);

  // Handle server-side filtering
  const debouncedSearchableColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) => {
          return searchableColumns.find((column) => column.value === filter.id);
        })
      ),
      500
    )
  ) as ColumnFiltersState;

  const filterableColumnFilters = columnFilters.filter((filter) => {
    return filterableColumns.find((column) => column.value === filter.id);
  });

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Opt out when advanced filter is enabled, because it contains additional params
    if (enableAdvancedFilter) return;

    // Prevent resetting the page on initial render
    if (!mounted) {
      setMounted(true);
      return;
    }

    // Initialize new params
    const newParamsObject = {
      page: 1,
    };

    // Handle debounced searchable column filters
    for (const column of debouncedSearchableColumnFilters) {
      if (typeof column.value === "string") {
        Object.assign(newParamsObject, {
          [column.id]: typeof column.value === "string" ? column.value : null,
        });
      }
    }

    // Handle filterable column filters
    for (const column of filterableColumnFilters) {
      if (typeof column.value === "object" && Array.isArray(column.value)) {
        Object.assign(newParamsObject, { [column.id]: column.value.join(".") });
      }
    }

    // Remove deleted values
    for (const key of searchParams.keys()) {
      if (
        (searchableColumns.find((column) => column.value === key) &&
          !debouncedSearchableColumnFilters.find((column) => column.id === key)) ||
        (filterableColumns.find((column) => column.value === key) &&
          !filterableColumnFilters.find((column) => column.id === key))
      ) {
        Object.assign(newParamsObject, { [key]: null });
      }
    }

    // After cumulating all the changes, replace new params
    router.replace(`${pathname}?${createQueryString(newParamsObject)}`);

    table.setPageIndex(0);
  }, [JSON.stringify(debouncedSearchableColumnFilters), JSON.stringify(filterableColumnFilters)]);

  const table = useReactTable({
    ...props,
    pageCount,
    state: {
      pagination,
      // sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return { table };
}
