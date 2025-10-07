"use client"
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Calendar,
  MessageSquare,
  Bell,
  Plus,
  Download,
  Send,
  Target,
  Award,
  ArrowUpRight,
  Code,
  Palette,
  Database,
  PieChart,
  TrendingDown,
  Activity,
  Moon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const stats = [
    {
      label: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      colorClass: 'bg-chart-1',
    },
    {
      label: 'Active Jobs',
      value: '342',
      change: '+8.2%',
      trend: 'up',
      icon: Briefcase,
      colorClass: 'bg-chart-2',
    },
    {
      label: 'Applications',
      value: '1,248',
      change: '+23.1%',
      trend: 'up',
      icon: FileText,
      colorClass: 'bg-chart-3',
    },
    {
      label: 'Companies',
      value: '156',
      change: '+5.3%',
      trend: 'up',
      icon: Building2,
      colorClass: 'bg-chart-4',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      candidate: 'Sarah Johnson',
      job: 'Senior Frontend Developer',
      company: 'TechCorp',
      status: 'PENDING',
      time: '2 hours ago',
    },
    {
      id: 2,
      candidate: 'Michael Chen',
      job: 'Product Designer',
      company: 'DesignHub',
      status: 'APPROVED',
      time: '5 hours ago',
    },
    {
      id: 3,
      candidate: 'Emma Williams',
      job: 'Data Analyst',
      company: 'DataFlow',
      status: 'PENDING',
      time: '8 hours ago',
    },
    {
      id: 4,
      candidate: 'James Rodriguez',
      job: 'Backend Engineer',
      company: 'CloudSys',
      status: 'REJECTED',
      time: '1 day ago',
    },
    {
      id: 5,
      candidate: 'Lisa Anderson',
      job: 'Marketing Manager',
      company: 'BrandCo',
      status: 'APPROVED',
      time: '1 day ago',
    },
  ];

  const topJobs = [
    {
      id: 1,
      title: 'Full Stack Developer',
      applications: 89,
      company: 'TechVision',
      type: 'FULLTIME',
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      applications: 67,
      company: 'CreativeMinds',
      type: 'REMOTE',
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      applications: 54,
      company: 'CloudOps',
      type: 'FULLTIME',
    },
    {
      id: 4,
      title: 'Marketing Specialist',
      applications: 43,
      company: 'MarketPro',
      type: 'PARTTIME',
    },
    {
      id: 5,
      title: 'Data Scientist',
      applications: 38,
      company: 'DataTech',
      type: 'REMOTE',
    },
  ];

  const activityData = [
    { month: 'Jan', applications: 145 },
    { month: 'Feb', applications: 189 },
    { month: 'Mar', applications: 234 },
    { month: 'Apr', applications: 198 },
    { month: 'May', applications: 267 },
    { month: 'Jun', applications: 215 },
  ];

  const quickActions = [
    {
      label: 'Post New Job',
      icon: Plus,
      colorClass: 'bg-primary hover:bg-primary/90',
      textColor: 'text-primary-foreground',
    },
    {
      label: 'Add Company',
      icon: Building2,
      colorClass: 'bg-chart-2 hover:bg-chart-2/90',
      textColor: 'text-primary-foreground',
    },
    {
      label: 'Export Report',
      icon: Download,
      colorClass: 'bg-secondary hover:bg-secondary/80',
      textColor: 'text-secondary-foreground',
    },
    {
      label: 'Send Notification',
      icon: Send,
      colorClass: 'bg-chart-1 hover:bg-chart-1/90',
      textColor: 'text-primary-foreground',
    },
  ];

  const applicationStatusData = [
    {
      status: 'Pending',
      count: 562,
      percentage: 45,
      color: 'text-chart-1',
      strokeColor: '#cf8e2a',
    },
    {
      status: 'Approved',
      count: 423,
      percentage: 34,
      color: 'text-chart-2',
      strokeColor: '#57a699',
    },
    {
      status: 'Rejected',
      count: 263,
      percentage: 21,
      color: 'text-destructive',
      strokeColor: '#b4523e',
    },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 1847 },
    { month: 'Feb', users: 2105 },
    { month: 'Mar', users: 2389 },
    { month: 'Apr', users: 2456 },
    { month: 'May', users: 2698 },
    { month: 'Jun', users: 2847 },
  ];

  const topSkills = [
    {
      skill: 'React',
      demand: 95,
      jobs: 124,
      icon: Code,
      color: 'text-chart-1',
    },
    {
      skill: 'Node.js',
      demand: 88,
      jobs: 108,
      icon: Database,
      color: 'text-chart-2',
    },
    {
      skill: 'Python',
      demand: 82,
      jobs: 95,
      icon: Code,
      color: 'text-chart-3',
    },
    {
      skill: 'UI/UX Design',
      demand: 76,
      jobs: 87,
      icon: Palette,
      color: 'text-chart-4',
    },
    {
      skill: 'AWS',
      demand: 71,
      jobs: 79,
      icon: Database,
      color: 'text-chart-5',
    },
  ];

  const hiringFunnel = [
    {
      stage: 'Applications Received',
      count: 1248,
      percentage: 100,
      icon: FileText,
    },
    { stage: 'Under Review', count: 562, percentage: 45, icon: Clock },
    { stage: 'Shortlisted', count: 186, percentage: 15, icon: Target },
    { stage: 'Interviewed', count: 93, percentage: 7, icon: Users },
    { stage: 'Hired', count: 28, percentage: 2, icon: Award },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-chart-2/20 text-chart-2';
      case 'REJECTED':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-chart-1/20 text-chart-1';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="w-4 h-4" />;
      case 'REJECTED':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'FULLTIME':
        return 'bg-chart-1/20 text-chart-1';
      case 'PARTTIME':
        return 'bg-chart-4/20 text-chart-4';
      case 'REMOTE':
        return 'bg-chart-2/20 text-chart-2';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const maxApplications = Math.max(...activityData.map((d) => d.applications));
  const maxUsers = Math.max(...userGrowthData.map((d) => d.users));
  const totalApplicationStatus = applicationStatusData.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className={`${action.colorClass} ${action.textColor} rounded-xl p-4 flex items-center gap-3 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
                >
                  <div className="bg-background/20 p-2 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <h3 className="text-3xl font-bold text-card-foreground mb-2">
                      {stat.value}
                    </h3>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-chart-2" />
                      <span className="text-sm font-semibold text-chart-2">
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.colorClass} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-card-foreground">
                Application Status
              </h2>
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    className="text-muted"
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={applicationStatusData[0].strokeColor}
                    strokeWidth="20"
                    strokeDasharray={`${
                      (applicationStatusData[0].percentage * 251.2) / 100
                    } 251.2`}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={applicationStatusData[1].strokeColor}
                    strokeWidth="20"
                    strokeDasharray={`${
                      (applicationStatusData[1].percentage * 251.2) / 100
                    } 251.2`}
                    strokeDashoffset={`-${
                      (applicationStatusData[0].percentage * 251.2) / 100
                    }`}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={applicationStatusData[2].strokeColor}
                    strokeWidth="20"
                    strokeDasharray={`${
                      (applicationStatusData[2].percentage * 251.2) / 100
                    } 251.2`}
                    strokeDashoffset={`-${
                      ((applicationStatusData[0].percentage +
                        applicationStatusData[1].percentage) *
                        251.2) /
                      100
                    }`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-card-foreground">
                    {totalApplicationStatus}
                  </span>
                  <span className="text-xs text-muted-foreground">Total</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {applicationStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${item.color.replace(
                        'text-',
                        'bg-'
                      )}`}
                    ></div>
                    <span className="text-sm font-medium text-card-foreground">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-card-foreground">
                      {item.count}
                    </span>
                    <span className="text-xs text-muted-foreground w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-card-foreground">
                User Growth
              </h2>
            </div>
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between gap-2 pb-8">
                {userGrowthData.map((data, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="w-full flex flex-col items-center">
                      <span className="text-xs font-semibold text-card-foreground mb-1">
                        {data.users}
                      </span>
                      <div
                        className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary/80 relative group"
                        style={{ height: `${(data.users / maxUsers) * 200}px` }}
                      >
                        <div className="absolute inset-0 bg-primary-foreground opacity-0 group-hover:opacity-10 transition-opacity rounded-t-lg"></div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-card-foreground">
                  Application Trends
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Monthly application statistics
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors border border-border">
                <Calendar className="w-4 h-4" />
                Last 6 months
              </button>
            </div>
            <div className="space-y-4">
              {activityData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground w-12">
                    {data.month}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                      style={{
                        width: `${
                          (data.applications / maxApplications) * 100
                        }%`,
                      }}
                    >
                      <span className="text-xs font-semibold text-primary-foreground">
                        {data.applications}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-card-foreground">
                Top Jobs
              </h2>
            </div>
            <div className="space-y-4">
              {topJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-lg text-primary font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-card-foreground truncate">
                      {job.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {job.company}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(
                          job.type
                        )}`}
                      >
                        {job.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {job.applications} apps
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-card-foreground">
                  Top Skills in Demand
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Most requested skills across job postings
                </p>
              </div>
              <div className="bg-primary/20 p-2 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              {topSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${skill.color}`} />
                        <span className="text-sm font-semibold text-card-foreground">
                          {skill.skill}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {skill.jobs} jobs
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-chart-2" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${skill.demand}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-card-foreground w-10 text-right">
                        {skill.demand}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-card-foreground">
                  Hiring Funnel
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Candidate journey and conversion rates
                </p>
              </div>
              <div className="bg-chart-2/20 p-2 rounded-lg">
                <TrendingDown className="w-5 h-5 text-chart-2" />
              </div>
            </div>
            <div className="space-y-4">
              {hiringFunnel.map((stage, index) => {
                const Icon = stage.icon;
                const isLast = index === hiringFunnel.length - 1;
                return (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                          isLast ? 'bg-chart-2/20' : 'bg-muted'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isLast ? 'text-chart-2' : 'text-muted-foreground'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-card-foreground">
                            {stage.stage}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-card-foreground">
                              {stage.count}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({stage.percentage}%)
                            </span>
                          </div>
                        </div>
                        <div className="bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isLast ? 'bg-chart-2' : 'bg-muted-foreground'
                            }`}
                            style={{ width: `${stage.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    {!isLast && (
                      <div className="absolute left-5 top-10 w-0.5 h-4 bg-border"></div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-chart-2/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">
                  Conversion Rate
                </span>
                <span className="text-lg font-bold text-chart-2">2.24%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                From application to hire
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-card-foreground">
                Recent Applications
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Latest job applications from candidates
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-accent rounded-lg transition-colors">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Position
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-accent transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          {app.candidate.charAt(0)}
                        </div>
                        <span className="font-medium text-card-foreground">
                          {app.candidate}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-card-foreground">
                      {app.job}
                    </td>
                    <td className="py-4 px-4 text-sm text-card-foreground">
                      {app.company}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusIcon(app.status)}
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {app.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
