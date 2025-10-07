'use client';

import React from 'react';
import {
  Calendar,
  Briefcase,
  FolderOpen,
  TrendingUp,
  GraduationCap,
  DollarSign,
  MapPin,
  Check,
  MoveLeft,
  ArrowLeft,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { JobCard } from '@/components/jobs/job-card';
import { useJob, useJobs, Job, singleJob } from '@/services/query/jobs.query';
import { useApplyApplication } from '@/services/mutations/apply.mutation';
import Link from 'next/link';

export default function JobDetailsPage({
  params,
  adminView = false, // 👈 default = user view
}: {
  params: { id: string };
  adminView?: boolean;
}) {
  const { id } = params;
  const jobId = Number(id);
  const { mutate, isLoading } = useApplyApplication();

  const {
    data: job,
    isLoading: jobLoading,
    error: jobError,
  } = useJob<singleJob>(jobId);

  const { data: relatedJobs, isLoading: relatedLoading } = useJobs<Job[]>({
    categoryId: job?.categoryId,
    limit: 3,
  });

  if (jobLoading) return <div className="p-8">Loading job...</div>;
  if (jobError || !job) return <div className="p-8">Job not found</div>;

  const postedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSubmit = () => {
    mutate({ jobId });
  };

  return (
    <div
      className={`${
        adminView
          ? 'max-h-[80vh] overflow-y-auto' // 👈 Admin view
          : 'min-h-screen overflow-y-scroll' // 👈 User default
      }`}
    >
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        {adminView && 
        <Button variant="outline" size="icon" asChild>
            <Link href="/admin/jobs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>}
        
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center">Job Details</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {job.jobSkills?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.jobSkills.map((res, index) => (
                      <li key={index} className="flex gap-3">
                        <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          {res.skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{job.category.categoryName}</Badge>
                  <Badge variant="secondary">{job.company.name}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Job Title</p>
                    <p className="text-sm text-muted-foreground">{job.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Posted: {postedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Job Type</p>
                    <p className="text-sm text-muted-foreground">{job.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FolderOpen className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-muted-foreground">
                      {job.category.categoryName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-muted-foreground">
                      {job.experience}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Degree</p>
                    <p className="text-sm text-muted-foreground">
                      Bachelor&apos;s
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Salary</p>
                    <p className="text-sm text-muted-foreground">
                      ${job.salaryMin.toLocaleString()} - $
                      {job.salaryMax.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {job.location}
                    </p>
                  </div>
                </div>
              </CardContent>
              {!adminView && ( // 👈 Hide "Apply Now" in admin
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={handleSubmit}
                >
                  {isLoading ? 'Applying...' : 'Apply Now'}
                </Button>
              )}
            </Card>
          </div>
        </div>

        {!adminView && ( // 👈 Hide "Related Jobs" for admin
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Related Jobs</h2>
                <p className="text-muted-foreground">Jobs you may also like</p>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Post Resume
              </Button>
            </div>

            <div className="space-y-4">
              {!relatedLoading &&
                relatedJobs &&
                relatedJobs
                  .filter((r) => r.id !== job.id)
                  .map((relatedJob) => (
                    <JobCard key={relatedJob.id} job={relatedJob} />
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
