import { useMutation } from '@tanstack/react-query';
import { apiGet } from '../api';

export const useGoogleLoginMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiGet<{ url: string }>('auth/google/login');
      return response.url;
    },
  });
};
