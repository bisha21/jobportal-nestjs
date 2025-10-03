'use client';

import {
  Calendar,
  Briefcase,
  FolderOpen,
  TrendingUp,
  GraduationCap,
  DollarSign,
  MapPin,
  Check,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { JobCard } from '@/components/jobs/job-card';
import { useJob, useJobs, Job, singleJob } from '@/services/query/jobs.query';
import { use } from 'react';

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = use(params);
  const jobId = Number(id);

  // Fetch current job
  const {
    data: job,
    isLoading: jobLoading,
    error: jobError,
  } = useJob<singleJob>(jobId);

  // Fetch related jobs (same category, exclude current job)
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Job Details</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
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

            {/* Responsibilities */}
            {job.jobSkills?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.jobSkills.map((res, index: number) => (
                      <li key={index} className="flex gap-3">
                        <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{res.skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80"
                  >
                    {job.category.categoryName}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80"
                  >
                    {job.company.name}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardHeader>
                <CardTitle>Share Job</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
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
                    <p className="text-sm text-muted-foreground">
                      {job.type === 'FULLTIME' ? 'Full Time' : job.type}
                    </p>
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
                    <p className="text-sm font-medium">Offered Salary</p>
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
            </Card>

            {/* Send Message */}
            <Card>
              <CardHeader>
                <CardTitle>Send Us Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="Phone Number" type="tel" />
                <Textarea placeholder="Text Message" rows={4} />
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Jobs */}
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
      </div>
    </div>
  );
}
