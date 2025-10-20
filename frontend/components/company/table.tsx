'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCompanyColumns } from './column';
import { useCompanyQuery } from '@/services/query/usecompany.query';
import { DataTable } from '../reusable/data-table';
import useModalContext from '@/hooks/usemodal';

export default function CompanyTable() {
  const { openModal } = useModalContext();
  const { data } = useCompanyQuery();

  return (
    <div>
      <DataTable
        columns={getCompanyColumns()}
        data={data || []}
        // isLoading={isFetching}
        functions={{
          search: {
            name: 'name',
            placeholder: 'Search by company name...',
          },
          add: {
            node: (
              <Button
                onClick={() =>
                  openModal({ key: 'ADD_COMPANY' })
                }
              >
                <Plus />
                Add Company
              </Button>
            ),
          },
        }}
      />
    </div>
  );
}
