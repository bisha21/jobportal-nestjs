import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../api';

interface ApplyJobResponse {
  success: boolean;
  message: string;
}

interface ApplyJobVariables {
  jobId: number;
  resumeUrl?: string; // Optional, if you want to send a resume URL
}

export const useApplyApplication = () => {
  return useMutation<ApplyJobResponse, unknown, ApplyJobVariables>({
    mutationFn: async ({ jobId: id, resumeUrl }) => {
      try {
        const response = await apiRequest(`job/apply/${id}`, {
          method: 'POST',
          data: resumeUrl ? { resumeUrl } : undefined,
        });
        return response;
      } catch (error) {
        console.error('Error applying for job:', error);
        throw error; // Let React Query handle error states
      }
    },
  });
};
