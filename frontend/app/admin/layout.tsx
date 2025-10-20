'use client';

import { DashboardLayout } from '@/components/dashboard-layout'; // your second component
import { useAuth } from '@/context/auth-context';
import { ReactNode } from 'react';
import { Navbar } from './nav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userRole = user?.role;
  const userName = user?.fullName;
  const userEmail = user?.email;
  const userAvatar = user?.profile;

  return (
    <DashboardLayout
      userRole={userRole ?? 'JOBSEEKER'}
      userName={userName ?? 'Guest User'}
      userEmail={userEmail ?? 'Guest User'}
    >
      <Navbar
        userName={userName ?? 'Guest User'}
        userEmail={userEmail ?? 'Guest User'}
        userAvatar={userAvatar ?? ''}
      />

      <main className="overflow-y-scroll">{children}</main>
    </DashboardLayout>
  );
}
