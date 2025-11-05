'use client';
import { Briefcase, Clock, DollarSign, MapPin, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: { name: string; logoUrl: string };
    category: { categoryName: string };
    type: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
    createdAt: Date;
  };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow relative">
      <CardContent className="p-6 flex gap-4 relative">
        {/* Company Logo */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={job.company.logoUrl || '/images/default-company.png'}
            alt="Company Logo"
            fill
            className="object-contain rounded"
          />
        </div>

        {/* Job Details */}
        <div className="flex-1 space-y-3">
          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.company.name}</p>

          {/* Job Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-teal-600" />
              <span>{job.category.categoryName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-teal-600" />
              <span>
                {job.type === 'FULLTIME'
                  ? 'Full time'
                  : job.type === 'PARTTIME'
                  ? 'Part time'
                  : job.type}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-teal-600" />
              <span>
                ${job.salaryMin}-{job.salaryMax}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-teal-600" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2">
          <Button variant="ghost" size="icon">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button
            asChild
            variant="default"
            className="bg-teal-600 hover:bg-blue-700 text-white"
          >
            <Link href={`/jobs/${job.id}`}>Job Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
