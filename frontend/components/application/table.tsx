'use client';

import { DataTable } from '../reusable/data-table';
import { applicationColumns } from './column';
import { useApplicationQuery } from '@/services/query/application.query';

export default function ApplicationTable() {
  const { data, isFetching } = useApplicationQuery();

  console.log('hahah', data);

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
