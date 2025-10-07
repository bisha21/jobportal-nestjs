import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';
import { UserProfile } from './profile';

export type UserForAdmin = {
  id: number;
  fullName: string;
  email: string;
  profile: string | null;
  role: string;
  resume: string | null;
  phoneNumber: string | null;
};

export const useUserQuery = () =>
  useQuery<UserForAdmin[]>({
    queryKey: ['user'],
    queryFn: () => apiRequest('user', { method: 'GET' }),
  });

export const useUserProfileQuery = (id: number) =>
  useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: () => apiRequest(`user/${id}`, { method: 'GET' }),
  });
