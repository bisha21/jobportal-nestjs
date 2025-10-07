"use client";
import { DataTable } from '@/components/reusable/data-table';
import { userColumns } from '@/components/user/column';
import { useUserQuery } from '@/services/query/user.query';
import React from 'react';

function User() {
  const { data, isFetching } = useUserQuery();
  console.log('hahah', data);

  return (
    <div>
      <DataTable
        columns={userColumns}
        data={data || []}
        // isLoading={isFetching}
        functions={{
          search: {
            name: 'fullName',
            placeholder: 'Search by company name...',
          },
        }}
      />
    </div>
  );
}

export default User;
