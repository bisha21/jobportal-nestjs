'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../api';
import { toast } from 'react-toastify';

export interface CategoryInput {
  categoryName: string;
}

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategoryInput) => {
      const response = await apiRequest('category', {
        method: 'POST',
        data,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      toast.success('Category created successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to create category'
      );
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CategoryInput }) => {
      const response = await apiRequest(`category/${id}`, {
        method: 'PATCH',
        data,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      toast.success('Category updated successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update category'
      );
    },
  });
};
