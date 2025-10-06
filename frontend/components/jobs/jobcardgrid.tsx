'use client';

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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobCard } from './job-card';

interface JobCardGridProps<TData, TValue> {
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
}

export function JobCardGrid<TData, TValue>({
  columns,
  data,
  functions,
}: JobCardGridProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const filteredRows = table.getRowModel().rows;

  return (
    <div className="space-y-6  max-h-[70vh] overflow-y-scroll">
      {/* Search Bar */}
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
              .getColumn(`${functions.search.name || ''}`)
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm mb-4"
        />
      )}

      {/* Card Grid */}
      <div className="grid gap-6 ">
        {filteredRows.length ? (
          filteredRows.map((row) => {
            const job = row.original;
            return <JobCard key={row.id} job={job} />;
          })
        ) : (
          <p className="text-center text-muted-foreground py-10">
            No results found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
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
