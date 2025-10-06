import { CreateJobInput } from '@/schemas/job';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, apiRequest } from '../api';
import { toast } from 'react-toastify';
export const useCreateJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateJobInput) => {
      try {
        const response = await apiRequest('job', {
          method: 'POST',
          data,
        });
        return response;
      } catch (error: unknown) {
        // Ensure error is shaped as ApiError
        throw error as ApiError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job'] });
      toast.success('Job created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create job');
    },
  });
};

export const useUpdateJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CreateJobInput }) => {
      try {
        const response = await apiRequest(`job/${id}`, {
          method: 'PATCH',
          data,
        });
        return response;
      } catch (error: unknown) {
        throw error as ApiError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job'] });
      toast.success('Job updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update job');
    },
  });
};
