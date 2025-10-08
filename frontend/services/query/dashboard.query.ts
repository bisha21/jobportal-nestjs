import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';

export type DashboardData = {
  totals: {
    totalUsers: number;
    totalCompanies: number;
    totalJobs: number;
    totalApplications: number;
  };
  growth: {
    userGrowth: { month: string; count: number }[];
    jobGrowth: { month: string; count: number }[];
  };
  topJobs: {
    title: string;
    company: string;
    applications: number;
  }[];
  topCompanies: {
    name: string;
    logoUrl: string;
    jobCount: number;
  }[];
  applications: {
    total: number;
    PENDING?: number;
    REJECTED?: number;
    APPROVED?: number;
  };
  recentApplications: {
    applicant: string;
    email: string;
    jobTitle: string;
    status: string;
    appliedAt: string;
  }[];
};

export const useDashboardQuery = () => {
  return useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: () => apiRequest('dashboard', { method: 'GET' }),
  });
};
