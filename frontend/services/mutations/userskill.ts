import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../api';

export const useAddUserSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (skill: string) => {
      return await apiRequest('/userskills', {
        method: 'POST',
        data: JSON.stringify({ skill }),
      });
    },
    onSuccess: () => {
      // Refresh skill list after adding
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
    },
  });
};

// ✅ Update Skill
export const useUpdateUserSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, skill }: { id: number; skill: string }) => {
      return await apiRequest(`/userskills/${id}`, {
        method: 'PATCH',
        data: JSON.stringify({ skill }),
      });
    },
    onSuccess: () => {
      // Refresh skill list after update
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
    },
  });
};

// ✅ Delete Skill
export const useDeleteUserSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/userskills/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      // Refresh skill list after delete
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
    },
  });
};
