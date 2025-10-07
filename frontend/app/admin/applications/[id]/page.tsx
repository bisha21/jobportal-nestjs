'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Download,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  User,
  ArrowLeft,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { useSingleApplicationQuery } from '@/services/query/application.query';

export default function AdminApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id; // ✅ get id from route params

  const { data: application, isLoading } = useSingleApplicationQuery(Number(id));

  // ✅ handle loading state
  if (isLoading) return <p className="p-4">Loading application details...</p>;
  if (!application) return <p className="p-4">Application not found</p>;

  // ✅ helper for badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'secondary';
      case 'APPROVED':
        return 'default';
      case 'REJECTED':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/applications">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Application Details</h1>
              <Badge variant="outline" className="gap-1">
                <Shield className="h-3 w-3" />
                Admin View
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              System-wide application management
            </p>
          </div>
        </div>

        <Badge
          variant={getStatusColor(application.status)}
          className="text-sm px-4 py-2"
        >
          {application.status}
        </Badge>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicant Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Applicant Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={application.user.profile} />
                <AvatarFallback>
                  {application.user.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">
                {application.user.fullName}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {application.user.bio}
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground break-all">
                    {application.user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {application.user.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Applied On</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {application.user.resume && (
              <Button asChild className="w-full" variant="outline">
                <a
                  href={application.user.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4 mr-2" />
                  View Resume
                </a>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Job Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-2xl font-bold mb-2">{application.job.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-sm">Position</p>
                <p className="text-muted-foreground text-sm">
                  {application.job.position}
                </p>
              </div>
              <div>
                <p className="font-medium text-sm">Location</p>
                <p className="text-muted-foreground text-sm">
                  {application.job.location}
                </p>
              </div>
              <div>
                <p className="font-medium text-sm">Experience</p>
                <p className="text-muted-foreground text-sm">
                  {application.job.experience}
                </p>
              </div>
              <div>
                <p className="font-medium text-sm">Salary Range</p>
                <p className="text-muted-foreground text-sm">
                  ${application.job.salaryMin} - ${application.job.salaryMax}
                </p>
              </div>
              <div>
                <p className="font-medium text-sm">Job Type</p>
                <p className="text-muted-foreground text-sm">
                  {application.job.type}
                </p>
              </div>
              <div>
                <p className="font-medium text-sm">Deadline</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(application.job.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                {application.job.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
