'use client';
import JobDetailsPage from '@/app/jobs/[id]/page';
import React from 'react';

function JobDetail({ params: { id } }) {
  const jobId = id;
  return <JobDetailsPage params={{ id: jobId }} adminView />;
}

export default JobDetail;
