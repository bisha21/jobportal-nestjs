'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../api';
import { toast } from 'react-toastify';

interface JobSkillInput {
  jobId: number;
  skill: string;
}

// ✅ Add Job Skill
export const useAddJobSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: JobSkillInput) => {
      const response = await apiRequest(`/jobskills`, {
        method: 'POST',
        data: JSON.stringify({ jobId: data.jobId, skill: data.skill }),
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobSkills'] });
      toast.success('Job skill added successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to add job skill');
    },
  });
};

// ✅ Update Job Skill
export const useUpdateJobSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      skill,
      jobId,
    }: {
      id: number;
      skill: string;
      jobId: number;
    }) => {
      const response = await apiRequest(`/jobskills/${id}`, {
        method: 'PATCH',
        data: JSON.stringify({ skill, jobId }),
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobSkills'] });
      toast.success('Job skill updated successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update job skill'
      );
    },
  });
};

// ✅ Delete Job Skill
