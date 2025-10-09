import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../api';

export interface ApplicantInfo {
  userId: number;
  name: string;
  email: string;
  profile: string;
  jobTitle: string;
  companyName: string;
  conversationId: number | null;
  lastMessage: string | null;
  timestamp: string | null;
  unread: number;
  online: boolean;
}

export interface MessageType {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  conversationId: number;
}

export interface UserApplicationInfo {
  companyId: number;
  companyName: string;
  ownerId: number;
  name: string;
  email: string;
  profile: string | null;
  conversationId: number | null;
  timestamp: string | null;
  unread: number;
  online: boolean;
}

export const useMessageQuery = () => {
  return useQuery<ApplicantInfo[]>({
    queryKey: ['message'],
    queryFn: async () => apiRequest('messages/applicants', { method: 'GET' }),
  });
};

export const useMessageHistory = (conversationId: number) =>
  useQuery<MessageType[]>({
    queryKey: ['messages', conversationId],
    queryFn: () =>
      apiRequest(`messages/conversation/${conversationId}`, {
        method: 'GET',
      }),
    enabled: !!conversationId, // only fetch if conversationId exists
  });

export const useUserApplications = () => {
  return useQuery<UserApplicationInfo[]>({
    queryKey: ['userApplications'],
    queryFn: async () =>
      apiRequest('messages/user-applications', { method: 'GET' }),
  });
};
