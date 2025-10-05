"use client";
import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface DataCardGridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  functions?: {
    search?: {
      name?: string;
      placeholder?: string;
    };
    add?: {
      node: React.ReactNode;
    };
  };
  renderCard?: (row: TData) => React.ReactNode; // custom card rendering
}

export function DataCardGrid<TData, TValue>({
  columns,
  data,
  functions,
  renderCard,
}: DataCardGridProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const filteredRows = table.getRowModel().rows;

  return (
    <div className="space-y-6">
      {/* 🔍 Search + Add */}
      <div className="flex justify-between items-center">
        {functions?.search && (
          <Input
            placeholder={functions.search.placeholder}
            value={
              (table
                .getColumn(`${functions.search.name}`)
                ?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table
                .getColumn(`${functions.search.name||''}`)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        {functions?.add?.node}
      </div>

      {/* 🗂️ Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRows.length ? (
          filteredRows.map((row) => {
            const originalData = row.original;
            return (
              <div key={row.id}>
                {renderCard ? (
                  renderCard(originalData)
                ) : (
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">
                        {String(
                          row.getValue(
                            columns.find((col) => col.id === 'name')?.id ||
                              'name'
                          )
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {String(
                          row.getValue(
                            columns.find((col) => col.id === 'industry')?.id ||
                              'industry'
                          )
                        )}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      {columns.map((col) => {
                        const label =
                          typeof col.header === 'string' ? col.header : col.id;
                        const value = row.getValue(col.id!);
                        if (col.id === 'name' || col.id === 'industry')
                          return null;
                        return (
                          <div
                            key={col.id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-muted-foreground capitalize">
                              {label}:
                            </span>
                            <span className="font-medium">
                              {typeof value === 'string'
                                ? value
                                : String(value)}
                            </span>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted-foreground py-10">
            No results found.
          </p>
        )}
      </div>
      {/* 🔄 Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} total
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
