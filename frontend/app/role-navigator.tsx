'use client';

import { ReactNode } from 'react';
import { SocketProvider } from '@/context/socket-context';
import { useAuth } from '@/context/auth-context';
import Navbar from '@/components/navbar';

const NavbarWithProps = Navbar as React.ComponentType<{
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}>;

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // Show navbar for all logged in users (adjust as needed)
  const showNavbar = !!user;

  return (
    <>
      {showNavbar && user && (
        <NavbarWithProps userName={user.email} userEmail={user.email} />
      )}

      {user ? <SocketProvider>{children}</SocketProvider> : <>{children}</>}
    </>
  );
}
