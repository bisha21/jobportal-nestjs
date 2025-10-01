import { LoginInput } from '@/schemas/login';
import { useMutation } from '@tanstack/react-query';
import { ApiError, apiRequest } from '../api';
import { CreateUserInput } from '@/schemas/register';

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
