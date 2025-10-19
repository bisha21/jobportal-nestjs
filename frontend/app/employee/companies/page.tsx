'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useModalContext from '@/hooks/usemodal';
import { useCompanyQuery } from '@/services/query/usecompany.query';
import { getCompanyColumns } from '@/components/company/column';
import { useAuth } from '@/context/auth-context';
import { DataTable } from '@/components/reusable/data-table';

export default function CompanyTable() {
  const { openModal } = useModalContext();
  const { user } = useAuth();
  const { data} = useCompanyQuery({ ownerId: user?.id });

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
              <Button onClick={() => openModal({ key: 'ADD_COMPANY' })}>
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
