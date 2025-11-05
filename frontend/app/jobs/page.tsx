'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { JobList } from '@/components/jobs/job-list';
import { Job, useJobs } from '@/services/query/jobs.query';
import { JobFilters } from '@/components/jobs/side-bar';

export default function JobsPage() {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [page, setPage] = useState(1);
  const limit = 3;
  const {
    data: jobs,
    isLoading,
    error,
  } = useJobs<Job[]>({ ...filters, page, limit });

  const categories = jobs?.length
    ? Array.from(
        new Map(jobs.map((job) => [job.category.id, job.category])).values()
      )
    : [];

  const companies = jobs?.length
    ? Array.from(
        new Map(jobs.map((job) => [job.company.id, job.company])).values()
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
            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={jobs?.length < limit}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
