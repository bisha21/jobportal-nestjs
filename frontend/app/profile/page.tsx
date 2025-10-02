'use client';

import type React from 'react';
import { useEffect, useState, useMemo } from 'react';
import {
  Mail,
  Phone,
  Edit2,
  Save,
  Briefcase,
  Heart,
  Building2,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { useProfile, type UserProfile } from '@/services/query/profile';

export default function UserProfile() {
  const { data, isLoading, isError } = useProfile();

  // always call hooks first
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState<UserProfile>({
    fullName: '',
    email: '',
    phoneNumber: '',
    bio: '',
    profile: '',
    role: '',
    resume: '',
    applications: [],
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  const applications = useMemo(() => {
    return (
      userData?.applications.map((app) => ({
        id: app.id,
        jobTitle: app.job.title,
        company: app.job.company.name,
        appliedDate: app.createdAt,
        status: app.status.toLowerCase(),
      })) || []
    );
  }, [userData]);

  const stats = {
    applications: applications.length,
    favorites: 0, // Replace with real favorites count later
    companies: new Set(applications.map((a) => a.company)).size,
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        variant: 'secondary' as const,
        label: 'Pending',
        className: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
      },
      interview: {
        variant: 'default' as const,
        label: 'Interview',
        className: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
      },
      accepted: {
        variant: 'default' as const,
        label: 'Accepted',
        className: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
      },
      rejected: {
        variant: 'destructive' as const,
        label: 'Rejected',
        className: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
      },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Early returns after hooks
  if (isLoading) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <Card className="overflow-hidden mb-6 shadow-lg">
          <div className="h-32 bg-gradient-to-r from-chart-1 via-chart-4 to-chart-2"></div>

          <CardContent className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-4">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-card shadow-lg">
                  <AvatarImage
                    src={userData.profile || '/placeholder.svg'}
                    alt={userData.fullName}
                  />
                  <AvatarFallback className="text-2xl">
                    {userData.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInputChange}
                    className="text-3xl font-bold h-auto py-2 px-3"
                  />
                ) : (
                  <h1 className="text-3xl font-bold">{userData.fullName}</h1>
                )}
                <Badge variant="secondary" className="mt-2 capitalize">
                  {userData.role.toLowerCase()}
                </Badge>
              </div>
              <Button onClick={toggleEdit} size="lg">
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                {isEditing ? (
                  <Input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-muted-foreground">
                    {userData.email}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                {isEditing ? (
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-muted-foreground">
                    {userData.phoneNumber}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="shadow">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Briefcase className="h-5 w-5 text-chart-1" />
                <div className="text-3xl font-bold text-chart-1">
                  {stats.applications}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Applications</div>
            </CardContent>
          </Card>
          <Card className="shadow">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-chart-4" />
                <div className="text-3xl font-bold text-chart-4">
                  {stats.favorites}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Saved Jobs</div>
            </CardContent>
          </Card>
          <Card className="shadow">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Building2 className="h-5 w-5 text-chart-2" />
                <div className="text-3xl font-bold text-chart-2">
                  {stats.companies}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
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
                        <Badge
                          variant={getStatusBadge(app.status).variant}
                          className={getStatusBadge(app.status).className}
                        >
                          {getStatusBadge(app.status).label}
                        </Badge>
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
