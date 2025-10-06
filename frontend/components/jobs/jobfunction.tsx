import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const jobFunctions = {
  search: {
    name: 'title', // Column to filter by
    placeholder: 'Search jobs...',
  },
  add: {
    node: (
      <Link href="/jobs/create">
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Add Job
        </Button>
      </Link>
    ),
  },
};
