'use client';

import { Plus, Briefcase, FileText, MessageSquare, Bell } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function QuickActions() {
  const actions = [
    {
      label: 'Add Company',
      icon: Plus,
      color:
        'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700',
      onClick: () => console.log('Add Company clicked'),
    },
    {
      label: 'Add Job',
      icon: Briefcase,
      color:
        'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700',
      onClick: () => console.log('Add Job clicked'),
    },
    {
      label: 'View Applications',
      icon: FileText,
      color:
        'bg-amber-500  hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700',
      onClick: () => console.log('View Applications clicked'),
    },
    {
      label: 'See Messages',
      icon: MessageSquare,
      color:
        'bg-blue-500  hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700',
      onClick: () => console.log('See Messages clicked'),
    },
    {
      label: 'View Notifications',
      icon: Bell,
      color:
        'bg-emerald-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700',
      onClick: () => console.log('View Notifications clicked'),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                onClick={action.onClick}
                className={`${action.color} text-white justify-start gap-3 h-auto py-3 px-4`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
