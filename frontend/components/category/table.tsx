'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '../reusable/data-table';
import useModalContext from '@/hooks/usemodal';
import { useCategoryQuery } from '@/services/query/category.query';
import { getCategoryColumns } from './column';

export default function CategoryTable() {
  const { openModal } = useModalContext();
  const { data, isFetching } = useCategoryQuery();

  return (
    <div>
      <DataTable
        columns={getCategoryColumns()}
        data={data || []}
        // isLoading={isFetching}
        functions={{
          search: {
            name: 'name',
            placeholder: 'Search by company name...',
          },
          add: {
            node: (
              <Button onClick={() => openModal({ key: 'ADD_CATEGORY' })}>
                <Plus />
                Add Category
              </Button>
            ),
          },
        }}
      />
    </div>
  );
}
