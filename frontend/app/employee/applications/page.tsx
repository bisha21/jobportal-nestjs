'use client';

import { applicationColumns } from '@/components/application/column';
import { DataTable } from '@/components/reusable/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';
import { useApplicationQuery } from '@/services/query/application.query';

export default function ApplicationTable() {
  const { user } = useAuth();
  const { data, isFetching } = useApplicationQuery({ ownerId: user?.id });

  if (isFetching) {
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-10 w-3/4" />
    </div>;
  }
  if (!data) return <div>Application not found</div>;

  return (
    <div>
      <DataTable
        columns={applicationColumns}
        data={data || []}
        // isLoading={isFetching}
        functions={{
          search: {
            name: 'jobTitle', // matches column id
            placeholder: 'Search by Job Title...',
          },
        }}
      />
    </div>
  );
}
