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

  // Redirect admin/employee to their dashboards if they try to access public pages
  useEffect(() => {
    if (isLoading) return;

    if (user) {
      if (user.role === 'ADMIN' && !pathname.startsWith('/admin')) {
        router.replace('/admin');
      } else if (
        user.role === 'EMPLOYEE' &&
        !pathname.startsWith('/employee')
      ) {
        router.replace('/employee');
      }
      // Jobseekers stay on public pages
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // Show navbar for public pages and jobseekers
  const showNavbar = isPublicPage || (user && user.role === 'JOBSEEKER');

  return (
    <>
      {showNavbar && <Navbar />}

      {isPublicPage ? (
        // Render the public page, either for non-logged-in users or jobseekers
        <>{children}</>
      ) : (
        // Protected sections for admins/employees
        <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}>
          <SocketProvider>{children}</SocketProvider>
        </ProtectedRoute>
      )}
    </>
  );
}
