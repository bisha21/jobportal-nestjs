'use client';

import { useMemo } from 'react';
import { Briefcase, Calendar, ExternalLink, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUserProfileQuery } from '@/services/query/user.query';
import { Button } from '@/components/ui/button';

export default function UserProfile({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { data, isLoading, isError } = useUserProfileQuery(id);

  const applications = useMemo(() => {
    if (!data?.applications) return [];
    return data.applications.map((app) => ({
      id: app.id,
      jobTitle: app.job.title,
      company: app.job.company.name,
      appliedDate: app.createdAt,
      status: app.status.toLowerCase(),
    }));
  }, [data]);

  if (isLoading)
    return <div className="text-center py-20">Loading profile...</div>;
  if (isError || !data)
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load profile
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="overflow-hidden mb-6 shadow-lg">
          <div className="h-32 bg-gradient-to-r from-chart-1 via-chart-4 to-chart-2"></div>
          <CardContent className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-4">
              <Avatar className="w-32 h-32 border-4 border-card shadow-lg">
                <AvatarImage
                  src={
                    typeof data.profile === 'string'
                      ? data.profile
                      : '/placeholder.svg'
                  }
                  alt={data.fullName}
                />
                <AvatarFallback className="text-2xl">
                  {data.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold">{data.fullName}</h2>
                <Badge variant="secondary" className="mt-2 capitalize">
                  {data.role.toLowerCase()}
                </Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>{data.phoneNumber}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <div className="font-medium mb-2">Bio</div>
              <p className="text-muted-foreground">
                {data.bio || 'No bio provided'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Applications */}
        <Card className="shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">My Applications</h2>
              </div>
              <Badge variant="secondary">{applications.length} Total</Badge>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        {app.jobTitle}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {app.company}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(app.appliedDate).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{app.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
