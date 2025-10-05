'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { CompanyResponse } from '@/services/query/usecompany.query';
import { ActionButton } from '../reusable/action-btn';

export function getCompanyColumns(): ColumnDef<CompanyResponse>[] {
  return [
    {
      id: 'sn',
      header: 'S.No',
      accessorKey: 'id',
    },

    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: 'industry',
      accessorKey: 'industry',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Industry <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: 'location',
      accessorKey: 'location',
      header: 'Location',
    },
    {
      id: 'companySize',
      accessorKey: 'companySize',
      header: 'Company Size',
    },
    {
      id: 'website',
      accessorKey: 'website',
      header: 'Website',
      cell: ({ row }) =>
        row.original.website ? (
          <a
            href={row.original.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Visit
          </a>
        ) : (
          <span className="text-gray-400 italic">N/A</span>
        ),
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString('en-GB'),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <ActionButton<CompanyResponse>
          row={row.original}
          edit={{ key: 'EDIT_COMPANY' }}
          delete={{ type: 'company' }}
        />
      ),
    },
  ];
}
