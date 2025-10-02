"use client"

import { JobCard } from "./job-card";

interface JobListProps {
  jobs: Array<{
    id: number;
    title: string;
    company: { name: string; logoUrl: string };
    category: { categoryName: string };
    type: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
    createdAt: string;
  }>;
}

export function JobList({ jobs }: JobListProps) {
  if (!jobs.length) {
    return <p className="text-center text-gray-500">No jobs found.</p>;
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
