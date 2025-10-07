'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { ActionButton } from '../reusable/action-btn';

export interface CategoryResponse {
  id: number;
  categoryName: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    fullName: string;
    email: string;
  };
}

export function getCategoryColumns(): ColumnDef<CategoryResponse>[] {
  return [
    {
      id: 'sn',
      header: 'S.No',
      accessorKey: 'id',
      cell: ({ row }) => row.index + 1, // Auto S.No
    },
    {
      id: 'categoryName',
      accessorKey: 'categoryName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {row.original.categoryName}
        </span>
      ),
    },
    {
      id: 'user',
      header: 'Created By',
      cell: ({ row }) => {
        const user = row.original.user;
        return user ? (
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{user.fullName}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        ) : (
          <span className="italic text-gray-400">Unknown</span>
        );
      },
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => (
        <span>
          {new Date(row.original.createdAt).toLocaleDateString('en-GB')}
        </span>
      ),
    },
    {
      id: 'updatedAt',
      accessorKey: 'updatedAt',
      header: 'Updated At',
      cell: ({ row }) => (
        <span>
          {new Date(row.original.updatedAt).toLocaleDateString('en-GB')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <ActionButton<CategoryResponse>
          row={row.original}
          edit={{ key: 'EDIT_CATEGORY' }}
          delete={{ type: 'category' }}
        />
      ),
    },
  ];
}
