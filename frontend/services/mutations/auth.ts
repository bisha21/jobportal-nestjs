"use client";
import { LoginInput } from '@/schemas/login';
import { useMutation } from '@tanstack/react-query';
import { ApiError, apiRequest } from '../api';
import { CreateUserInput } from '@/schemas/register';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export interface ForgetPasswordDto {
  email: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: number;
}

export interface ResetPasswordDto extends VerifyOtpDto {
  password: string;
  confirmPassword: string;
}

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

export function useForgetPasswordMutation() {
  const router = useRouter();

  return useMutation<void, ApiError, ForgetPasswordDto>({
    mutationFn: async (data) => {
      try {
        const response = await apiRequest('auth/forget-password', {
          method: 'POST',
          data,
        });
        return response;
      } catch (error: unknown) {
        throw error as ApiError;
      }
    },
    onSuccess: () => {
      router.push('/verify-otp');
    },
  });
}

export function useVerifyOtpMutation() {
  const router = useRouter();

  return useMutation<void, ApiError, VerifyOtpDto>({
    mutationFn: async (data) => {
      try {
        const response = await apiRequest('auth/verify-otp', {
          method: 'POST',
          data,
        });
        return response;
      } catch (error: unknown) {
        throw error as ApiError;
      }
    },
    onSuccess: () => {
      router.push('/reset-password');
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation<void, ApiError, ResetPasswordDto>({
    mutationFn: async (data) => {
      try {
        const response = await apiRequest('auth/reset-password', {
          method: 'POST',
          data,
        });
        return response;
      } catch (error: unknown) {
        throw error as ApiError;
      }
    },
  });
}
