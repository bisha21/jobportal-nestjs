'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface GrowthChartProps {
  title: string;
  description?: string;
  data: { month: string; count: number }[];
}

export function GrowthChart({ title, description, data }: GrowthChartProps) {
  const chartConfig = {
    growth: {
      label: title,
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 border-0 shadow-md text-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-gray-300">
          {description || 'Last 6 months performance'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#ec4899" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.4} />
              </linearGradient>
            </defs>

            {/* <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#475569"
            /> */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="#cbd5e1"
              tickFormatter={(v) => v.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="count"
              type="monotone"
              fill="url(#growthGradient)"
              stroke="url(#growthGradient)"
              fillOpacity={0.4}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col items-start gap-1 text-sm">
          <div className="flex items-center gap-2 font-medium text-white">
            Trending up this month{' '}
            <TrendingUp className="h-4 w-4 text-pink-400" />
          </div>
          <div className="text-gray-400">Showing overall growth trend</div>
        </div>
      </CardFooter>
    </Card>
  );
}
