'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jobColumns } from '@/components/jobs/column';
import { DataTable } from '@/components/reusable/data-table';
import { useJobs } from '@/services/query/jobs.query';
import useModalContext from '@/hooks/usemodal';
import { useAuth } from '@/context/auth-context';

export default function JobsPage() {
  const { openModal } = useModalContext();
  const { user } = useAuth();
  const { data: jobs = [], isLoading } = useJobs({ ownerId: user?.id });

  if (isLoading) return <p>Loading...</p>;

  return (
    <DataTable
      columns={jobColumns}
      data={jobs}
      functions={{
        search: {
          name: 'title', // search by job title
          placeholder: 'Search by job title...',
        },
        add: {
          node: (
            <Button
              onClick={() => openModal({ key: 'ADD_JOB' })}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Job
            </Button>
          ),
        },
      }}
    />
  );
}
