import { ColumnDef } from '@tanstack/react-table';
import { ActionButton } from '../reusable/action-btn';
import { Application } from '@/services/query/application.query';

export const applicationColumns: ColumnDef<Application>[] = [
  { id: 'id', header: 'S.No', accessorKey: 'id', cell: ({ row }) => row.index + 1 },

  {
    id: 'applicant',
    header: 'Applicant',
    accessorFn: (row) => row.user.fullName,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.original.user.fullName}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.user.email}
        </span>
      </div>
    ),
  },

  {
    id: 'jobTitle',
    header: 'Job Title',
    accessorFn: (row) => row.job?.title ?? 'N/A', // safe access
  },

  {
    id: 'company',
    header: 'Company',
    accessorFn: (row) => row.job?.company?.name ?? 'N/A', // safe access
  },

  {
    id: 'location',
    header: 'Location',
    accessorFn: (row) => row.job?.location ?? 'N/A',
  },

  {
    id: 'type',
    header: 'Job Type',
    accessorFn: (row) => row.job?.type ?? 'N/A',
  },

  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-sm font-medium ${
          row.original.status === 'PENDING'
            ? 'bg-yellow-100 text-yellow-800'
            : row.original.status === 'APPROVED'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },

  {
    id: 'appliedAt',
    header: 'Applied On',
    accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
  },

  {
    id: 'resume',
    header: 'Resume',
    cell: ({ row }) =>
      row.original.user.resume ? (
        <a
          href={row.original.user.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View Resume
        </a>
      ) : (
        <span className="text-gray-400 italic">N/A</span>
      ),
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <ActionButton<Application>
        row={row.original}
        edit={{ key: 'EDIT_APPLICATION' }}
        delete={{ type: 'application' }}
        view={{ onPageUrl: '/admin/applications' }}
      />
    ),
  },
];
