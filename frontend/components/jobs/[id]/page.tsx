'use client';
import JobDetailsPage from '@/app/jobs/[id]/page';
import { useParams } from 'next/navigation';

export default function JobDetailsPageWrapper({ adminView = false }) {
  const params = useParams();
  const id = params?.id; // safe
  if (!id) return <div>Job not found</div>;

  return <JobDetailsPage params={{ id }} adminView={adminView} />;
}
