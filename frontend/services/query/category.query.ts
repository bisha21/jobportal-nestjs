import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';
import { CategoryResponse } from '@/components/category/column';

export const useCategoryQuery = () => {
  return useQuery<CategoryResponse[]>({
    queryKey: ['category'],
    queryFn: async () => apiRequest('category', { method: 'GET' }),
  });
};
