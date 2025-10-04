'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Moon, Sun, X, Bell } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import useModalContext from '@/hooks/usemodal';
import { useAuth } from '@/context/auth-context';
// navLinks.ts
export const PUBLIC_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Browse Jobs' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setTheme } = useTheme();
  const { openModal } = useModalContext();
  const { isAuthenticated, user, logout } = useAuth();

  const showProtectedLinks = !isAuthenticated || user?.role === 'JOBSEEKER';

  return (
    <nav className="bg-background text-foreground shadow-md border-b border-border fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold">JobPortal</span>
            </Link>
          </div>

          {/* Navigation Links */}
          {showProtectedLinks && (
            <div className="hidden md:flex space-x-8">
              {PUBLIC_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Auth / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon">
                  <Bell size={20} />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Image
                        src={user?.profile || ''}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() =>
                    openModal({
                      key: 'LOGIN_MODAL',
                    })
                  }
                >
                  Login
                </Button>
                <Button
                  onClick={() =>
                    openModal({
                      key: 'SIGNUP_MODAL',
                    })
                  }
                >
                  Sign Up
                </Button>
              </>
            )}

            {/* Theme Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {mobileOpen && showProtectedLinks && (
        <div className="md:hidden bg-card border-t border-border px-2 pt-2 pb-3 space-y-2">
          {PUBLIC_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
