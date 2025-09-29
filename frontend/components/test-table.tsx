'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DataTable } from './reusable/data-table';

// Example job data type
type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  datePosted: string;
};

export default function JobTable() {
  const data: Job[] = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'Acme Corp',
      location: 'New York, USA',
      datePosted: '2025-09-28',
    },
    {
      id: '2',
      title: 'Backend Developer',
      company: 'TechSoft',
      location: 'London, UK',
      datePosted: '2025-09-26',
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'NextGen',
      location: 'Remote',
      datePosted: '2025-09-25',
    },
  ];

  const columns: ColumnDef<Job>[] = [
    {
      accessorKey: 'title',
      header: 'Job Title',
    },
    {
      accessorKey: 'company',
      header: 'Company',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'datePosted',
      header: 'Date Posted',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert(`Apply to ${row.original.title}`)}
        >
          Apply
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={data}
        functions={{
          search: { name: 'title', placeholder: 'Search by job title' },
          add: {
            node: (
              <Button variant="secondary" size="sm">
                Post Job
              </Button>
            ),
          },
        }}
      />
    </div>
  );
}
