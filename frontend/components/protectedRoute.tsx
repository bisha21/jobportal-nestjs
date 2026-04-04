'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (isLoading) return;

    // ✅ PUBLIC route → allow everyone (IMPORTANT FIX)
    if (allowedRoles.includes('PUBLIC')) return;

    // ❌ Not logged in
    if (!user) {
      router.replace('/login');
      return;
    }

    // ❌ Logged in but not allowed
    if (!allowedRoles.includes(user.role as UserRole)) {
      router.replace('/'); // safe now (won’t loop)
      return;
    }
  }, [user, isLoading, allowedRoles, router]);

  // ⏳ Loading state
  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // ✅ PUBLIC → render directly
  if (allowedRoles.includes('PUBLIC')) {
    return <>{children}</>;
  }

  // ❌ Not logged in → wait for redirect
  if (!user) {
    return null;
  }

  // ❌ Unauthorized → wait for redirect
  if (!allowedRoles.includes(user.role as UserRole)) {
    return null;
  }

  // ✅ Authorized
  return <>{children}</>;
}
