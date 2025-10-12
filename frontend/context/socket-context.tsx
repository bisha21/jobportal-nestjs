'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { connectSocket, getSocket } from '@/lib/scoket';

type Message = {
  id?: number;
  content: string;
  sender?: { id: number; email: string };
  conversationId?: number;
};

type TSocketContext = {
  socket: ReturnType<typeof getSocket> | null;
  isConnected: boolean;
  joinRoom: (conversationId: number) => void;
  sendMessage: (
    conversationId: number,
    content: string,
    receiverId: number
  ) => void;
  messages: Message[];
};

const SocketContext = createContext<TSocketContext | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [messagesMap, setMessagesMap] = useState<Record<number, Message[]>>({});
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);
  const [socketInitialized, setSocketInitialized] = useState(false);

  useEffect(() => {
    // ✅ Only run in client
    if (typeof window === 'undefined') return;

    const socket = connectSocket();
    if (!socket) return;

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('✅ Socket connected', socket.id);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ Socket disconnected');
    });

    socket.on('newMessage', (msg: Message) => {
      if (!msg.conversationId) return;
      setMessagesMap((prev) => ({
        ...prev,
        [msg.conversationId]: [...(prev[msg.conversationId] || []), msg],
      }));
    });

    setSocketInitialized(true);

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  const joinRoom = useCallback(
    (conversationId: number) => {
      setCurrentConversationId(conversationId);
      if (!messagesMap[conversationId]) {
        setMessagesMap((prev) => ({
          ...prev,
          [conversationId]: [],
        }));
      }
      getSocket()?.emit('joinConversationRoom', conversationId);
    },
    [messagesMap]
  );

  const sendMessage = useCallback(
    (conversationId: number, content: string, receiverId: number) => {
      getSocket()?.emit('sendMessage', { conversationId, content, receiverId });
    },
    []
  );

  // Show children only after socket is initialized
  if (!socketInitialized) return <p>Connecting to socket...</p>;

  return (
    <SocketContext.Provider
      value={{
        socket: getSocket(),
        isConnected,
        joinRoom,
        sendMessage,
        messages: currentConversationId
          ? messagesMap[currentConversationId] || []
          : [],
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within SocketProvider');
  return context;
}
