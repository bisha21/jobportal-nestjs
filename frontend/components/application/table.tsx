'use client';

import { DataTable } from '../reusable/data-table';
import { Skeleton } from '../ui/skeleton';
import { applicationColumns } from './column';
import { useApplicationQuery } from '@/services/query/application.query';

export default function ApplicationTable() {
  const { data, isFetching } = useApplicationQuery();

  if (isFetching) {
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-10 w-3/4" />
    </div>;
  }
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
