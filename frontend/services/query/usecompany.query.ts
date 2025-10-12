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

interface CompanyQueryParams {
  ownerId?: number;
  name?: string;
  location?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  include?: string;
}

export const useCompanyQuery = (queryParams?: CompanyQueryParams) => {
  return useQuery<CompanyResponse[], ApiError>({
    queryKey: ['company', queryParams],
    queryFn: async () => {
      // Build query string
      const queryString = queryParams
        ? '?' +
          Object.entries(queryParams)
            .filter(([_, value]) => value !== undefined)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join('&')
        : '';

      const response = await apiRequest<CompanyResponse[]>(
        `/company${queryString}`,
        {
          method: 'GET',
        }
      );

      console.log('Api Response:', response);
      return response;
    },
  });
};
