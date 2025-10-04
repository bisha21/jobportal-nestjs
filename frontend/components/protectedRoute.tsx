'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type UserRole = 'ADMIN' | 'EMPLOYEE' | 'JOBSEEKER' | 'PUBLIC';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: UserRole[]; // optional now
};

export default function ProtectedRoute({
  children,
  allowedRoles = ['PUBLIC'],
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      if (allowedRoles.includes('PUBLIC')) {
        setIsAllowed(true); 
      } else {
        router.push('/');
        setIsAllowed(false);
      }
      return;
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
      router.push('/'); 
      setIsAllowed(false);
      return;
    }

    setIsAllowed(true);
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading || isAllowed === null) {
    return <p>Loading...</p>;
  }

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
}
