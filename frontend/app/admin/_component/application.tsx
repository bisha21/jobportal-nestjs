'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ApplicationStatusChartProps {
  applications?: {
    total?: number;
    PENDING?: number;
    REJECTED?: number;
    APPROVED?: number;
  };
}

const chartConfig = {
  PENDING: {
    label: 'Pending',
    color: '#FFA500', // Vibrant orange
  },
  APPROVED: {
    label: 'Approved',
    color: '#22C55E', // Bright green
  },
  REJECTED: {
    label: 'Rejected',
    color: '#EF4444', // Red
  },
};

export function ApplicationStatusChart({
  applications,
}: ApplicationStatusChartProps) {
  const chartData = [
    {
      name: 'Pending',
      value: applications?.PENDING || 0,
      fill: chartConfig.PENDING.color,
    },
    {
      name: 'Approved',
      value: applications?.APPROVED || 0,
      fill: chartConfig.APPROVED.color,
    },
    {
      name: 'Rejected',
      value: applications?.REJECTED || 0,
      fill: chartConfig.REJECTED.color,
    },
  ];

  // If all values are zero, we render a placeholder
  const allZero = chartData.every((item) => item.value === 0);

  return (
    <Card className="flex flex-col w-full  shadow-md border border-border">
      <CardHeader className="items-center pb-1">
        <CardTitle className="text-base font-semibold text-foreground">
          Application Status
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Current overview
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center pb-2">
        {allZero ? (
          <div className="text-muted-foreground text-sm">No data available</div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={75}
                strokeWidth={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-3">
          {chartData.map((item) => (
            <div key={item.name} className="flex flex-col items-center text-xs">
              <div
                className="w-3 h-3 rounded-full mb-1"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-muted-foreground">{item.name}</span>
              <span className="text-foreground font-semibold">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-1 text-xs">
        <div className="flex items-center gap-1 font-medium leading-none">
          Trending up by 4.8% this month{' '}
          <TrendingUp className="h-3 w-3 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Overall application distribution
        </div>
      </CardFooter>
    </Card>
  );
}
