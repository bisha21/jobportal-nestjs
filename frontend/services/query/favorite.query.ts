import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';

export interface FavoriteJob {
  id: number;
  job: {
    id: number;
    title: string;
    company: {
      name: string;
    };
  };
}

export const useFavoriteJobs = () =>
  useQuery<FavoriteJob[]>({
    queryKey: ['favorites'],
    queryFn: () => apiRequest('/favorites', { method: 'GET' }),
  });
