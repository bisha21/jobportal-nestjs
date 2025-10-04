import { LoginInput } from '@/schemas/login';
import { useMutation } from '@tanstack/react-query';
import { ApiError, apiRequest } from '../api';
import { CreateUserInput } from '@/schemas/register';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      try {
        const response = await apiRequest('auth/login', {
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
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (data: CreateUserInput) => {
      try {
        const response = await apiRequest('auth/register', {
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
}

export function useUploadProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const data = await apiRequest('/upload/profile', {
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile picture uploaded successfully');
    },
    onError: () => {
      toast.error('Failed to upload profile picture');
    },
  });
}

export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('resume', file);

      const data = await apiRequest('/upload/resume', {
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      toast.success(data?.message || 'Resume uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to upload resume');
    },
  });
}


export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData: Partial<CreateUserInput>) => {
      const data = await apiRequest('/auth/profile', {
        method: 'PATCH',
        data: updateData,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    },
  });
}

