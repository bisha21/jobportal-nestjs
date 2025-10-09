'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Circle, Send } from 'lucide-react';
import { useSocket } from '@/context/socket-context';
import { useMessageHistory } from '@/services/query/message.query';
import { useAuth } from '@/context/auth-context';

interface MessageType {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  conversationId: number;
}

interface ChatLayoutProps {
  conversationId: number;
  receiverId: number;
  receiverName: string;
  receiverProfile?: string;
  compact?: boolean;
}

export function ChatLayout({
  conversationId,
  receiverId,
  receiverName,
  receiverProfile,
  compact = false,
}: ChatLayoutProps) {
  const { user } = useAuth();
  const { socket, sendMessage, joinRoom } = useSocket();
  const [localMessages, setLocalMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loggedInUserId = user?.id || 0;

  const { data: messageHistory } = useMessageHistory(conversationId);

  useEffect(() => {
    joinRoom(conversationId);
  }, [conversationId, joinRoom]);

  useEffect(() => {
    if (messageHistory) setLocalMessages(messageHistory);
  }, [messageHistory]);

  useEffect(() => {
    socket?.on('newMessage', (msg: MessageType) => {
      if (msg.conversationId === conversationId) {
        setLocalMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket?.off('newMessage');
  }, [socket, conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(conversationId, message, loggedInUserId);
      setMessage('');
    }
  };

  return (
    <Card
      className={`flex flex-col ${
        compact ? 'h-[500px]' : 'h-screen'
      } bg-gradient-to-b from-white to-gray-100`}
    >
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white shadow">
        <Avatar className="w-10 h-10">
          <AvatarImage src={receiverProfile || '/placeholder.svg'} />
          <AvatarFallback>{receiverName.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="ml-3 font-semibold">{receiverName}</p>
        <Circle className="w-2 h-2 text-green-500 ml-2" />
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto bg-linear-to-r/increasing from-indigo-500 to-teal-400">
        {localMessages.map((msg, i) => {
          const isOwn = msg.senderId === loggedInUserId;
          return (
            <div
              key={i}
              className={`flex mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md px-4 py-2 rounded-2xl shadow break-words whitespace-pre-wrap ${
                  isOwn
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                }`}
              >
                {msg.content}
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t flex gap-2 bg-white">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="rounded-full px-4"
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 rounded-full p-2"
        >
          <Send className="w-5 h-5 text-white" />
        </Button>
      </div>
    </Card>
  );
}
