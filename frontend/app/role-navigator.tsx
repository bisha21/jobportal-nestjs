'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import Navbar from '@/components/navbar';
import ProtectedRoute from '@/components/protectedRoute';
import { SocketProvider } from '@/context/socket-context';

type RoleNavigatorProps = {
  children: ReactNode;
};

export default function RoleNavigatorWithProtection({
  children,
}: RoleNavigatorProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Redirect based on role after authentication
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'ADMIN' && !pathname.startsWith('/admin')) {
        router.push('/admin');
      } else if (
        user.role === 'EMPLOYEE' &&
        !pathname.startsWith('/employee')
      ) {
        router.push('/employee');
      } else if (
        user.role === 'JOBSEEKER' &&
        !pathname.startsWith('/jobseeker') &&
        pathname === '/login' // prevent access to login page
      ) {
        router.push('/jobseeker');
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) return <p>Loading...</p>;

  // ✅ Define public pages
  const publicPages = [
    '/',
    '/about',
    '/contact',
    '/jobs',
    '/jobs/[id]',
    '/login',
    '/register',
    '/reset-password',
    '/forget-password',
    '/verify-otp',
  ];
  const isPublicPage = publicPages.includes(pathname);

  return (
    <>
      {/* ✅ Navbar visible for jobseekers and unauthenticated users */}
      {(!user || user.role === 'JOBSEEKER') && <Navbar />}

      {/* ✅ Access rules */}
      {isPublicPage ? (
        // 🧠 Jobseeker can access all public pages except login
        user && user.role === 'JOBSEEKER' && pathname === '/login' ? (
          router.push('/jobseeker') // redirect to dashboard
        ) : (
          <>{children}</>
        )
      ) : (
        <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE', 'JOBSEEKER']}>
          {children}
        </ProtectedRoute>
      )}
    </>
  );
}
