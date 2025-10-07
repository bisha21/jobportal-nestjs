import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';

export interface Application {
  id: number;
  status: string;
  resumeUrl: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    profile?: string;
    resume?: string;
  };
  job: {
    id: number;
    title: string;
    location: string;
    type: string;
    company: {
      name: string;
    };
  };
}
export type SingleApplication = {
  id: number;
  userId: number;
  jobId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  resumeUrl: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    password: string;
    resume: string;
    profile: string;
    phoneNumber: string;
    bio: string;
    role: 'ADMIN' | 'USER' | 'EMPLOYER'; // adjust if you have other roles
    otp: string | null;
    otpExpiry: string | null;
    createdAt: string;
    updatedAt: string;
  };
  job: {
    id: number;
    title: string;
    description: string;
    position: string;
    location: string;
    experience: string;
    salaryMin: number;
    salaryMax: number;
    type: 'FULLTIME' | 'PARTTIME' | 'INTER' | string; // extend if needed
    deadline: string;
    companyId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  };
};

export const useApplicationQuery = () => {
  return useQuery<Application[]>({
    queryKey: ['applications'],
    queryFn: async () => apiRequest('applications', { method: 'GET' }),
  });
};

export const useSingleApplicationQuery = (id: number) => {
  return useQuery({
    queryKey: ['applications', id], 
    queryFn: async () =>
      apiRequest(`applications/${id}`, { method: 'GET' }),
  });
};

