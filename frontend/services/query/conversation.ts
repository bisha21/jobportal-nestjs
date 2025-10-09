import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';

export interface Conversation {
  id: number;
  jobId: number | null;
  participants: {
    id: number;
    fullName: string;
    email: string;
    profile?: string;
  }[];
  messages: any[];
  createdAt: string;
  updatedAt: string;
}

export const useConversation = (jobId: number, participantId: number) =>
  useQuery<Conversation>({
    queryKey: ['conversation', jobId, participantId],
    queryFn: async () =>
      apiRequest(`/messages/conversations`, {
        method: 'POST',
        data: { jobId, participants: [participantId] },
      }),
    enabled: !!jobId && !!participantId, // only fetch if both exist
  });
