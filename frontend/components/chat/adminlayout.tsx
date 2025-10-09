'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMessageQuery } from '@/services/query/message.query';
import { ChatLayout } from './chatlayout';

export default function AdminChatPage() {
  const { data: users } = useMessageQuery();
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Card className="w-96 border-r rounded-none flex flex-col">
        <CardHeader>
          <CardTitle>Chats</CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1">
          {users?.map((user) => (
            <div
              key={user.userId}
              onClick={() => setSelectedUser(user)}
              className={`p-3 flex items-center cursor-pointer hover:bg-secondary ${
                selectedUser?.userId === user.userId ? 'bg-secondary' : ''
              }`}
            >
              <Avatar>
                <AvatarImage src={user.profile || '/placeholder.svg'} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="ml-3">{user.name}</p>
            </div>
          ))}
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <div className="flex-1">
        {selectedUser ? (
          <ChatLayout
            conversationId={selectedUser.conversationId}
            receiverId={selectedUser.userId}
            receiverName={selectedUser.name}
            receiverProfile={selectedUser.profile}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
