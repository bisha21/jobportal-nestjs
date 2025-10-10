import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';

interface userSkill {
    id: number;
  skill: string;
}

export const useUserSkillQuery = () => {
  return useQuery<userSkill[]>({
    queryKey: ['userSkills'],
    queryFn: () => apiRequest('/userskills', { method: 'GET' }),
  });
};
