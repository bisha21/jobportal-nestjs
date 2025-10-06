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

  return (
    <div >
      <DashboardLayout
        userRole={userRole}
        userName={userName}
        userEmail={userEmail}
      >
        <Navbar userName={userName} userEmail={userEmail} userAvatar="" />

        <main className='overflow-y-scroll'>
            {children}
        </main>
      </DashboardLayout>
    </div>
  );
}
