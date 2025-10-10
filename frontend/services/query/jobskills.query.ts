import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';

export interface JobSkill {
  id: number;
  skill: string;
}

export const useJobSkillQuery = (jobId: number) =>
  useQuery<JobSkill[]>({
    queryKey: ['jobSkills'],
    queryFn: () => apiRequest(`/jobskills/${jobId}`, { method: 'GET' }),
  });
