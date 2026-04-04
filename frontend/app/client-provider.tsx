'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from './provider';
import { AuthProvider } from '@/context/auth-context';
import { ToastContainer } from 'react-toastify';
import { ModalProvider } from '@/context/modal-context';
import ModalX from '@/modals/modal';
import { LayoutWrapper } from './role-navigator';
import { Footer } from '@/components/footer';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Providers>
        <AuthProvider>
          <ToastContainer />
          <ModalProvider>
            <ModalX />
            <LayoutWrapper>{children}</LayoutWrapper>
            <Footer />
          </ModalProvider>
        </AuthProvider>
      </Providers>
    </ThemeProvider>
  );
}
