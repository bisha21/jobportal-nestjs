'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { JobFilters } from '@/components/jobs/side-bar';
import { JobList } from '@/components/jobs/job-list';
import { Job, useJobs } from '@/services/query/jobs.query';

export default function JobsPage() {
  const [filters, setFilters] = useState<any>({});
  const { data: jobs, isLoading, error } = useJobs<Job[]>(filters);

  const categories =
    jobs?.length||0 > 0
      ? Array.from(
          new Map(
            jobs.map((job) => [
              job.category.id,
              { id: job.category.id, categoryName: job.category.categoryName },
            ])
          ).values()
        )
      : [];

  const companies =
    jobs?.length||0 > 0
      ? Array.from(
          new Map(
            jobs?.map((job) => [
              job.company.id,
              { id: job.company.id, name: job.company.name },
            ])
          ).values()
        )
      : [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs</p>;

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside>
        <JobFilters
          onFilterChange={setFilters}
          categories={categories}
          companies={companies}
        />
      </aside>

      <main className="md:col-span-3">
        <Card>
          <CardContent className="p-6">
            {jobs && <JobList jobs={jobs} />}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
