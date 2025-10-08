'use client';

import { connectSocket, getSocket } from '@/lib/scoket';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Message = {
  id?: number;
  content: string;
  sender?: { id: number; email: string };
};

type TSocketContext = {
  socket: ReturnType<typeof getSocket> | null;
  isConnected: boolean;
  joinRoom: (conversationId: number) => void;
  sendMessage: (conversationId: number, content: string) => void;
  messages: Message[];
};

const SocketContext = createContext<TSocketContext | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
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
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  const joinRoom = (conversationId: number) => {
    getSocket()?.emit('joinConversationRoom', conversationId);
  };

  const sendMessage = (conversationId: number, content: string) => {
    getSocket()?.emit('sendMessage', { conversationId, content });
  };

  return (
    <SocketContext.Provider
      value={{
        socket: getSocket(),
        isConnected,
        joinRoom,
        sendMessage,
        messages,
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
