'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type UserRole = 'ADMIN' | 'EMPLOYEE' | 'JOBSEEKER' | 'PUBLIC';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
};

export default function ProtectedRoute({
  children,
  allowedRoles = ['PUBLIC'],
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // Not logged in
    if (!user) {
      if (!allowedRoles.includes('PUBLIC')) {
        router.replace('/login');
      }
      setChecked(true);
      return;
    }

    // Logged in but unauthorized
    if (!allowedRoles.includes(user.role as UserRole)) {
      router.replace('/');
      setChecked(true);
      return;
    }

    // Authorized
    setChecked(true);
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading || !checked) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return <>{children}</>;
}
