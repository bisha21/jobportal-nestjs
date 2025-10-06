'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormHeaderProps {
  icon: LucideIcon; // Pass Lucide icons like Briefcase, Building2, etc.
  title: string;
  subtitle?: string;
}

export default function FormHeader({
  icon: Icon,
  title,
  subtitle,
}: FormHeaderProps) {
  return (
    <div className="text-center space-y-2 pb-6 border-b border-border/50">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
