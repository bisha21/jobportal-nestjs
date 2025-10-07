import { ColumnDef } from '@tanstack/react-table';
import { ActionButton } from '../reusable/action-btn';
import Image from 'next/image';
import { UserForAdmin } from '@/services/query/user.query';

export const userColumns: ColumnDef<UserForAdmin>[] = [
  {
    id: 'profile',
    header: 'Profile',
    accessorFn: (row) => row.profile,
    cell: ({ row }) => (
      <Image
        src={row.original.profile || '/default-avatar.png'}
        alt={row.original.fullName}
        className="w-10 h-10 rounded-full object-cover"
        width={200}
        height={200}
        loading="lazy"
      />
    ),
  },
  { id: 'fullName', header: 'Full Name', accessorKey: 'fullName' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
  {
    id: 'resume',
    header: 'Resume',
    accessorFn: (row) => row.resume,
    cell: ({ row }) =>
      row.original.resume ? (
        <a
          href={row.original.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Resume
        </a>
      ) : (
        'N/A'
      ),
  },
  { id: 'phoneNumber', header: 'Phone Number', accessorKey: 'phoneNumber' },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <ActionButton<UserForAdmin>
        row={row.original}
        view={{ onPageUrl: '/admin/users' }} // ✅ View action added
        delete={{ type: 'user' }}
      />
    ),
  },
];
