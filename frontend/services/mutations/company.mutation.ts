"use client"
import { useMutation } from '@tanstack/react-query';
import { ApiError, apiRequest } from '../api';
import { CreateCompanyInput } from '@/schemas/company';

export const useCreateCompanyMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateCompanyInput) => {
      try {
        const response = await apiRequest('company', {
          method: 'POST',
          data,
        });
        return response;
      } catch (error: unknown) {
        // Ensure error is shaped as ApiError
        throw error as ApiError;
      }
    },
  });
};

export const useUpdateCompanyMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: CreateCompanyInput;
    }) => {
      try {
        const response = await apiRequest(`company/${id}`, {
          method: 'PATCH',
          data,
        });
        return response;
      } catch (error: unknown) {
        throw error as ApiError;
      }
    },
  });
};

export const useDeleteCompanyMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        const response = await apiRequest(`company/${id}`, {
          method: 'DELETE',
        });
        return response;
      } catch (error: unknown) {
        throw error as ApiError;
      }
    },
  });
};
