"use client";
import { SocketProvider } from "@/context/socket-context";
import { useAuth } from "@/context/auth-context";
import Navbar from "@/components/navbar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  // Show navbar for public pages and jobseekers
  const showNavbar = !isLoading && (!user || user.role === 'JOBSEEKER');

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <>
      {showNavbar && <Navbar/>}
      {user && user.role !== 'JOBSEEKER' ? (
        <SocketProvider>{children}</SocketProvider>
      ) : (
        <>{children}</>
      )}
    </>
  );
}