'use client';

import { DashboardLayout } from '@/components/dashboard-layout'; // your second component
import { AuthProvider, useAuth } from '@/context/auth-context';
import { ReactNode } from 'react';
import { Navbar } from './nav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userRole = user?.role;
  const userName = user?.fullName;
  const userEmail = user?.email;
  const userAvatar = user?.profile;

  return (
    <div>
      <DashboardLayout
        userRole={userRole}
        userName={userName}
        userEmail={userEmail}
      >
        <AuthProvider>
          <Navbar
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
          />

          <main className="overflow-y-scroll">{children}</main>
        </AuthProvider>
      </DashboardLayout>
    </div>
  );
}
