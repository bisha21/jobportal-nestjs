'use client';

import type React from 'react';

import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  FileText,
  Award,
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
import { Textarea } from '@/components/ui/textarea';
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

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phoneNumber: '+1 (555) 123-4567',
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Love solving complex problems and creating intuitive user experiences.',
    profile:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    role: 'JOBSEEKER',
    resume: 'alex_johnson_resume.pdf',
  });

  const [skills] = useState([
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'TypeScript' },
    { name: 'PostgreSQL' },
    { name: 'AWS' },
    { name: 'Docker' },
  ]);

  const [stats] = useState({
    applications: 12,
    favorites: 8,
    companies: 3,
  });

  const [applications] = useState([
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      appliedDate: '2024-12-15',
      status: 'pending',
    },
    {
      id: 2,
      jobTitle: 'Full Stack Engineer',
      company: 'StartupXYZ',
      appliedDate: '2024-12-10',
      status: 'interview',
    },
    {
      id: 3,
      jobTitle: 'React Developer',
      company: 'Digital Solutions',
      appliedDate: '2024-12-08',
      status: 'accepted',
    },
    {
      id: 4,
      jobTitle: 'Software Engineer',
      company: 'Innovation Labs',
      appliedDate: '2024-12-05',
      status: 'rejected',
    },
    {
      id: 5,
      jobTitle: 'UI/UX Developer',
      company: 'Creative Agency',
      appliedDate: '2024-12-01',
      status: 'pending',
    },
  ]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <Card className="overflow-hidden mb-6 shadow-lg">
          {/* Cover Image */}
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
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-1 right-1 h-9 w-9 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <Card className="shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold">About Me</h2>
                </div>
                {isEditing ? (
                  <Textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="resize-none"
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {userData.bio}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-4 py-2 text-sm"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
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

          {/* Right Column */}
          <div className="space-y-6">
            {/* Resume Section */}
            <Card className="shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold">Resume</h2>
                </div>
                {userData.resume ? (
                  <div className="bg-muted rounded-lg p-4 border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {userData.resume}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF Document
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        size="sm"
                      >
                        Replace
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      No resume uploaded
                    </p>
                    <Button size="sm">Upload Resume</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Browse Jobs
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    View Applications
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    Saved Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
