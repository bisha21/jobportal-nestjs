'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import Navbar from '@/components/navbar';
import ProtectedRoute from '@/components/protectedRoute';

type RoleNavigatorProps = {
  children: ReactNode;
};

export default function RoleNavigatorWithProtection({
  children,
}: RoleNavigatorProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
        !pathname.startsWith('/jobseeker')
      ) {
        router.push('/jobseeker');
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* Show navbar only for JOBSEEKER and unauthenticated users */}
      {(!user || user.role === 'JOBSEEKER') && <Navbar />}

      {/* Make home page public */}
      {pathname === '/'|| pathname === '/about'|| pathname === '/contact' || pathname === '/jobs' ? (
        <>{children}</>
      ) : (
        <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE', 'JOBSEEKER']}>
          {children}
        </ProtectedRoute>
      )}
    </>
  );
}
