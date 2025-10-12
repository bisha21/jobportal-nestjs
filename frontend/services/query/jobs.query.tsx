'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiRequest } from '../api';

export interface Category {
  id: number;
  categoryName: string;
}

export interface Company {
  id: number;
  name: string;
  logoUrl: string;
  ownerId: number;
}

export interface JobSkill {
  skill: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  position: string;
  location: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  type: 'FULLTIME' | 'PARTTIME' | 'CONTRACT' | string;
  deadline: string;
  companyId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  company: Company;
}

export interface SingleJob extends Job {
  jobSkills: JobSkill[];
}

export interface SearchJobParams {
  title?: string;
  location?: string;
  companyId?: number;
  categoryId?: number;
  experience?: string[];
  salaryMin?: number;
  salaryMax?: number;
  ownerId?: number; // add ownerId here
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  include?: string;
}

/**
 * Generic hook to fetch jobs with query parameters
 */
export const useJobs = <T = Job[]>(params: SearchJobParams): UseQueryResult<T, unknown> => {
  // Clean out undefined, null, empty strings, or empty arrays
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => {
      if (Array.isArray(v)) return v.length > 0;
      return v !== undefined && v !== '' && v !== null;
    })
  );

  return useQuery<T>({
    queryKey: ['jobs', cleanedParams],
    queryFn: async () =>
      apiRequest('job', {
        method: 'GET',
        params: cleanedParams,
      }),
  });
};

/**
 * Hook to fetch single job by ID
 */
export const useJob = <T = SingleJob>(id: number): UseQueryResult<T, unknown> =>
  useQuery<T>({
    queryKey: ['job', id],
    queryFn: async () =>
      apiRequest(`job/${id}`, {
        method: 'GET',
      }),
  });
