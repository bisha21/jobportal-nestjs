import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';

interface Category {
  categoryName: string;
}

export const useCategoryQuery = () => {
  return useQuery<Category>({
    queryKey: ['category'],
    queryFn: async () => apiRequest('category', { method: 'GET' }),
  });
};
