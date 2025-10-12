import { Job } from '@/services/query/jobs.query';
import { ColumnDef } from '@tanstack/react-table';
import { ActionButton } from '../reusable/action-btn';
import { useAuth } from '@/context/auth-context';
import React from 'react';

const ActionCell: React.FC<{ row: Job }> = ({ row }) => {
  const { user } = useAuth();

  const viewUrl =
    user?.role === 'ADMIN'
      ? `/admin/jobs`
      : user?.role === 'EMPLOYEE'
      ? `/employee/jobs`
      : `/jobs/${row.id}`;

  return (
    <ActionButton<Job>
      row={row}
      view={{ onPageUrl: viewUrl }} // now it's a string
      edit={{ key: 'EDIT_JOB' }}
      delete={{ type: 'job' }}
    />
  );
};

export const jobColumns: ColumnDef<Job>[] = [
  { id: 'title', header: 'Job Title', accessorKey: 'title' },
  { id: 'company', header: 'Company', accessorFn: (row) => row.company.name },
  {
    id: 'category',
    header: 'Category',
    accessorFn: (row) => row.category.categoryName,
  },
  { id: 'type', header: 'Job Type', accessorKey: 'type' },
  { id: 'location', header: 'Location', accessorKey: 'location' },
  {
    id: 'salary',
    header: 'Salary Range',
    accessorFn: (row) => `$${row.salaryMin} - $${row.salaryMax}`,
  },
  {
    id: 'deadline',
    header: 'Deadline',
    accessorFn: (row) => new Date(row.deadline).toLocaleDateString(),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionCell row={row.original} />,
  },
];
