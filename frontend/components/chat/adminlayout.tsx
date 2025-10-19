'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMessageQuery } from '@/services/query/message.query';
import { ChatLayout } from './chatlayout';

export default function AdminChatPage() {
  const { data: users } = useMessageQuery(); // fetch all users with messages
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Card className="w-96 border-r rounded-none flex flex-col bg-card border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">Chats</CardTitle>
        </CardHeader>

        <ScrollArea className="flex-1">
          {users?.map((user) => (
            <div
              key={user.userId}
              onClick={() => setSelectedUser(user)}
              className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                selectedUser?.userId === user.userId
                  ? 'bg-primary/10 border-l-2 border-primary'
                  : 'hover:bg-muted border-l-2 border-transparent'
              }`}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={user.profile || '/placeholder.svg'} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.lastMessage || 'No messages yet'}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <div className="flex-1 bg-background">
        {selectedUser ? (
          <ChatLayout
            conversationId={selectedUser.conversationId}
            receiverId={selectedUser.userId}
            receiverName={selectedUser.name}
            receiverProfile={selectedUser.profile}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-lg">
              Select a conversation to start
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
