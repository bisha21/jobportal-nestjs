'use client';
import JobDetailsPage from '@/app/jobs/[id]/page';
import React from 'react';

function JobDetail({ params }: { params: { id: string } }) {
  const jobId = params.id
  return <JobDetailsPage params={{ id: jobId }} adminView />;
}

export default JobDetail;
