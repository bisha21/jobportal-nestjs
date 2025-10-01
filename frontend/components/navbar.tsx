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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setTheme } = useTheme();
  const { openModal } = useModalContext();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-background text-foreground shadow-md border-b border-border fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold">JobPortal</span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/jobs" className="hover:text-primary transition-colors">
              Browse Jobs
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Right: Auth / User */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notification Icon */}
                <Button variant="ghost" size="icon">
                  <Bell size={20} />
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Image
                        src={user?.profile || '/default-profile.png'}
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
                  className="flex-1 text-center px-3 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Login
                </Button>
                <Button
                  onClick={() =>
                    openModal({
                      key: 'SIGNUP_MODAL',
                    })
                  }
                  className="flex-1 text-center px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Button>
              </>
            )}

            {/* Theme Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-2 pt-2 pb-3 space-y-2">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 hover:bg-muted transition-colors"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="block rounded-md px-3 py-2 hover:bg-muted transition-colors"
          >
            Browse Jobs
          </Link>
          <Link
            href="/about"
            className="block rounded-md px-3 py-2 hover:bg-muted transition-colors"
          >
            About Us
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="block rounded-md px-3 py-2 hover:bg-muted transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block rounded-md px-3 py-2 hover:bg-muted transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block rounded-md px-3 py-2 hover:bg-muted transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
