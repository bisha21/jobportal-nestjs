'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
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
  receiverName,
  receiverProfile,
  compact = false,
}: ChatLayoutProps) {
  const { user } = useAuth();
  const { socket, sendMessage, joinRoom } = useSocket();

  const [localMessages, setLocalMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loggedInUserId = user?.id ?? 0;

  const { data: messageHistory } = useMessageHistory(conversationId);

  // Join room when conversationId changes
  useEffect(() => {
    if (conversationId) joinRoom(conversationId);
  }, [conversationId, joinRoom]);

  // Set initial message history
  useEffect(() => {
    if (messageHistory) setLocalMessages(messageHistory);
  }, [messageHistory]);

  // Listen to new messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: MessageType) => {
      if (msg.conversationId === conversationId) {
        setLocalMessages((prev) => [...prev, msg]);
      }
    };

    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, conversationId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      sendMessage(conversationId, message, loggedInUserId);
      setMessage('');
    }
  };

  return (
    <Card
      className={`flex flex-col ${
        compact ? 'h-[500px]' : 'h-screen'
      } bg-background border-0 rounded-lg overflow-hidden shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-card">
        <Avatar className="w-10 h-10">
          <AvatarImage src={receiverProfile || '/placeholder.svg'} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {receiverName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{receiverName}</p>
          <p className="text-xs text-muted-foreground">Active now</p>
        </div>
      </div>

      {/* Message area */}
      <ScrollArea className="flex-1 p-6 bg-background">
        <div className="space-y-4">
          {localMessages.map((msg) => {
            const isOwn = msg.senderId === loggedInUserId;
            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl break-words whitespace-pre-wrap ${
                    isOwn
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      isOwn
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
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
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border bg-card flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="rounded-full px-4 bg-muted border-0 text-foreground placeholder:text-muted-foreground"
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          onClick={handleSendMessage}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 h-10 w-10 flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}
