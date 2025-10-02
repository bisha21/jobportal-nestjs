"use client"
import { Briefcase, Clock, DollarSign, MapPin, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

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

function getTimeAgo(date: Date) {
  const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            {/* Company Logo */}
            <Image
              src={job.company.logoUrl}
              alt="Company Logo"
              fill
              style={{ objectFit: 'contain' }}
            />

            {/* Job Details */}
            <div className="flex-1 space-y-3">
              <div>
                {/* <p className="text-xs text-teal-600 mb-1">
                  {getTimeAgo(job.createdAt)}
                </p> */}
                <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.company.name}
                </p>
              </div>

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
                    ${job.salaryMin}-${job.salaryMax}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-teal-600" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              Job Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
