import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  profile: string;
  role: string;
  resume: string;
  applications: {
    id: number;
    status: string;
    createdAt: string;
    job: {
      title: string;
      company: { name: string };
    };
  }[];
}

export const useProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: () =>
      apiRequest<UserProfile>('auth/profile', {
        method: 'GET',
      }),
  });
};
