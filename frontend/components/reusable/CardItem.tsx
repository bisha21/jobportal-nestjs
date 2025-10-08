'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

type QuickAction = {
  label: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
  href?: string;
};

export default function QuickActions({
  quickActions,
}: {
  quickActions: QuickAction[];
}) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card
              key={index}
              className={cn(
                'cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                action.color
              )}
            >
              <Link href={action.href || '#'}>
                <CardHeader>
                  <CardTitle
                    className={cn(action.textColor, 'flex items-center gap-3')}
                  >
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {action.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to explore
                  </p>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
