'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSocket } from '@/context/socket-context';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const { isConnected, joinRoom, sendMessage, messages } = useSocket();
  const [conversationId, setConversationId] = useState<number>(0);
  const [message, setMessage] = useState('');

  const handleJoinRoom = () => {
    if (conversationId) joinRoom(conversationId);
  };

  const handleSendMessage = () => {
    if (conversationId && message) {
      sendMessage(conversationId, message);
      setMessage('');
    }
  };

  return (
    <div className="p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Chat Room</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Status: {isConnected ? 'Connected ✅' : 'Disconnected ❌'}</p>

          <div className="flex space-x-2 my-2">
            <Input
              type="number"
              placeholder="Conversation ID"
              value={conversationId || ''}
              onChange={(e) => setConversationId(Number(e.target.value))}
            />
            <Button onClick={handleJoinRoom}>Join Room</Button>
          </div>

          <div className="flex space-x-2 my-2">
            <Input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>

          <div className="border border-gray-200 rounded p-4 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="my-1">
                <strong>{msg.sender?.email || 'User'}:</strong> {msg.content}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
