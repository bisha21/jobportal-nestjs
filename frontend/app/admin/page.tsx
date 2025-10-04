import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Building2,
  Briefcase,
  FileText,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import {
  mockCurrentUser,
  mockUsers,
  mockCompanies,
  mockJobs,
  mockApplications,
  mockConversations,
} from '@/lib/mock-data';
import Link from 'next/link';
import { StatCard } from '@/components/reusable/stat-card';

export default function AdminDashboardPage() {
  const user = mockCurrentUser;

  const jobSeekers = mockUsers.filter((u) => u.role === 'JOBSEEKER');
  const employees = mockUsers.filter((u) => u.role === 'EMPLOYEE');
  const admins = mockUsers.filter((u) => u.role === 'ADMIN');
  const pendingApplications = mockApplications.filter(
    (app) => app.status === 'PENDING'
  );

  // Recent user registrations
  const recentUsers = [...mockUsers]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <DashboardLayout
      userRole="ADMIN"
      userName={user.name}
      userEmail={user.email}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              System-wide overview and management
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/reports">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Reports
            </Link>
          </Button>
        </div>

        {/* System Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={mockUsers.length}
            icon={Users}
            description={`${jobSeekers.length} seekers, ${employees.length} employees`}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Companies"
            value={mockCompanies.length}
            icon={Building2}
            description="Registered companies"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Total Jobs"
            value={mockJobs.length}
            icon={Briefcase}
            description="Active job postings"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Total Applications"
            value={mockApplications.length}
            icon={FileText}
            description={`${pendingApplications.length} pending`}
            trend={{ value: 23, isPositive: true }}
          />
        </div>

        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Job Seekers</p>
                  <p className="text-2xl font-bold">{jobSeekers.length}</p>
                </div>
                <Badge variant="secondary">
                  {Math.round((jobSeekers.length / mockUsers.length) * 100)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Employees</p>
                  <p className="text-2xl font-bold">{employees.length}</p>
                </div>
                <Badge variant="secondary">
                  {Math.round((employees.length / mockUsers.length) * 100)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Admins</p>
                  <p className="text-2xl font-bold">{admins.length}</p>
                </div>
                <Badge variant="secondary">
                  {Math.round((admins.length / mockUsers.length) * 100)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent User Registrations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent User Registrations</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/users">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        user.role === 'ADMIN'
                          ? 'default'
                          : user.role === 'EMPLOYEE'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {user.role}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/users/${user.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">New job posted:</span>
                  <span className="font-medium">Senior Frontend Developer</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">
                    New user registered:
                  </span>
                  <span className="font-medium">Jane Smith</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="text-muted-foreground">
                    Application submitted for:
                  </span>
                  <span className="font-medium">UX Designer</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="text-muted-foreground">
                    New company added:
                  </span>
                  <span className="font-medium">Tech Corp</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Active Conversations
                  </span>
                  <span className="font-bold">{mockConversations.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Pending Applications
                  </span>
                  <span className="font-bold">
                    {pendingApplications.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Approved Applications
                  </span>
                  <span className="font-bold">
                    {
                      mockApplications.filter((a) => a.status === 'APPROVED')
                        .length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Rejection Rate
                  </span>
                  <span className="font-bold">
                    {Math.round(
                      (mockApplications.filter((a) => a.status === 'REJECTED')
                        .length /
                        mockApplications.length) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
