'use client';
import { useQuery } from '@tanstack/react-query';
import { ApiError, apiRequest } from '../api';

export type CompanyResponse = {
  id: number;
  name: string;
  description: string;
  location: string;
  website?: string;
  industry: string;
  companySize: string;
  logoUrl?: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
};

export const useCompanyQuery = () => {
  return useQuery<CompanyResponse[], ApiError>({
    queryKey: ['company'],
    queryFn: async () => {
      const response = await apiRequest<CompanyResponse[]>('/company', {
        method: 'GET',
      });
      console.log('Api Response:', response);
      return response;
    },
  });
};
