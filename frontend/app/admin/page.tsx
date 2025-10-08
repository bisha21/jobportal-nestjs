'use client';

import { Users, Building2, Briefcase, FileText } from 'lucide-react';
import { ApplicationStatusChart } from './_component/application';
import { useDashboardQuery } from '@/services/query/dashboard.query';
import { RecentApplicationsTable } from './_component/recent-application';
import { StatCard } from './_component/stats-card';
import { GrowthChart } from './_component/growth-chart';
import { TopJobsTable } from './_component/top-jobs';
import { TopCompaniesList } from './_component/top-companies';
import { QuickActions } from './_component/quick-actions';

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboardQuery();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Error loading dashboard data.</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your job application platform analytics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={data.totals.totalUsers}
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Total Companies"
            value={data.totals.totalCompanies}
            icon={Building2}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Total Jobs"
            value={data.totals.totalJobs}
            icon={Briefcase}
            trend={{ value: 6.4, isPositive: true }}
          />
          <StatCard
            title="Total Applications"
            value={data.totals.totalApplications}
            icon={FileText}
            trend={{ value: 15.3, isPositive: true }}
          />
        </div>

        {/* Growth Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <GrowthChart
            title="User Growth"
            data={data.growth.userGrowth}
            dataKey="count"
            color="hsl(var(--chart-1))"
          />
          <GrowthChart
            title="Job Growth"
            data={data.growth.jobGrowth}
            dataKey="count"
            color="hsl(var(--chart-2))"
          />
        </div>

        {/* Middle Section */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <TopJobsTable jobs={data.topJobs} />
          </div>
          <div>
            <TopCompaniesList companies={data.topCompanies} />
          </div>
        </div>

        {/* Application Status */}
        <div className="grid gap-4 md:grid-cols-2">
          <ApplicationStatusChart applications={data.applications} />
          <QuickActions/>
          
        </div>

        {/* Recent Applications */}
        <RecentApplicationsTable applications={data.recentApplications} />
      </div>
    </div>
  );
}
