'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
import { JobCard } from '@/components/jobs/job-card';

const mockJobDetails = {
  2: {
    id: 2,
    title: 'Senior Frontend Developer',
    description:
      'We are looking for a skilled frontend developer with strong React and TypeScript experience. You will be responsible for building modern, responsive web applications and working closely with our design and backend teams. The ideal candidate has a passion for creating exceptional user experiences and writing clean, maintainable code.',
    position: 'Frontend Developer',
    location: 'Kathmandu, Nepal',
    experience: '3+ years',
    salaryMin: 60000,
    salaryMax: 90000,
    type: 'FULLTIME',
    deadline: '2025-12-31T23:59:59.000Z',
    createdAt: '2025-10-01T03:04:09.798Z',
    company: {
      id: 1,
      name: 'Tech Solutions Pvt. Ltd.',
      description:
        'A leading IT services and consulting company specializing in cloud solutions and enterprise software.',
      location: 'Kathmandu, Nepal',
      website: 'https://techsolutions.com',
      industry: 'Information Technology',
      companySize: '200-500 employees',
      logo: '🏢',
    },
    category: {
      id: 1,
      name: 'Design',
    },
    responsibilities: [
      'Develop and maintain high-quality React applications using modern best practices',
      'Collaborate with designers to implement pixel-perfect UI components',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and contribute to team knowledge sharing',
      'Optimize application performance and ensure cross-browser compatibility',
    ],
    skills: [
      'Expert knowledge of React, TypeScript, and modern JavaScript',
      'Strong understanding of HTML5, CSS3, and responsive design principles',
      'Experience with state management libraries (Redux, Zustand, etc.)',
      'Familiarity with testing frameworks (Jest, React Testing Library)',
      'Excellent problem-solving and communication skills',
    ],
    tags: ['JavaScript', 'Commerce', 'React', 'Design', 'Location'],
  },
};

// Mock related jobs
const relatedJobs = [
  {
    id: 3,
    title: 'Internal Creative Coordinator',
    company: { name: 'Green Group', logo: '🌿' },
    category: { name: 'Marketing' },
    type: 'PERMANENT',
    location: 'New York, USA',
    salaryMin: 44000,
    salaryMax: 54000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 4,
    title: 'District Intranet Director',
    company: { name: 'VanDelay - Adobe Co', logo: '🎨' },
    category: { name: 'Design' },
    type: 'PERMANENT',
    location: 'New York, USA',
    salaryMin: 44000,
    salaryMax: 54000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: 5,
    title: 'Corporate Tactics Facilitator',
    company: { name: 'Dietrich, Turner and Fritsch Inc', logo: '💼' },
    category: { name: 'Business' },
    type: 'PERMANENT',
    location: 'New York, USA',
    salaryMin: 44000,
    salaryMax: 54000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = mockJobDetails[2];

  if (!job) {
    return <div className="container mx-auto px-4 py-8">Job not found</div>;
  }

  const postedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section with dark background */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Job Details</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Key Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        {responsibility}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Professional Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.skills.map((skill, index) => (
                    <li key={index} className="flex gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Share Job */}
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

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Job Overview */}
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
                      {job.category.name}
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
                    <p className="text-sm text-muted-foreground">Bachelor's</p>
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

                {/* Map placeholder */}
                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Send Us Message */}
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

        {/* Related Jobs Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Related Jobs</h2>
              <p className="text-muted-foreground">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis
              </p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              Post Resume
            </Button>
          </div>

          <div className="space-y-4">
            {relatedJobs.map((relatedJob) => (
              <JobCard key={relatedJob.id} job={relatedJob} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
