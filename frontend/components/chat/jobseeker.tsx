'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserApplications } from '@/services/query/message.query';
import { ChatLayout } from './chatlayout';

export default function JobSeekerChatPage() {
  const { data: jobs } = useUserApplications();
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Card className="w-40 border-r rounded-none flex flex-col">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>

        <ScrollArea className="flex-1">
          {jobs?.map((job) => (
            <div
              key={job.companyId}
              onClick={() => setSelectedJob(job)}
              className={`p-3 flex items-center cursor-pointer hover:bg-secondary ${
                selectedJob?.jobId === job.companyId ? 'bg-secondary' : ''
              }`}
            >
              <Avatar>
                <AvatarImage src={job.profile || ''} />
                <AvatarFallback>{job.companyName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium">{job.companyName}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <div className="flex-1">
        {selectedJob ? (
          <ChatLayout
            conversationId={selectedJob.conversationId}
            receiverId={selectedJob.ownerId}
            receiverName={selectedJob.companyName}
            receiverProfile={selectedJob.profile}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
