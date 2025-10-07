'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Sun, Moon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

export function Navbar({ userName, userEmail, userAvatar }: NavbarProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="border-b bg-card -mt-6 -ml-7">
      <div className="flex h-24 items-center justify-between px-6">
        {/* Left side - can add logo or title here if needed */}
        <div className="flex-1" />

        {/* Right side - User info and actions */}
        <div className="flex items-center gap-3">
          {/* User Avatar and Name */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={userAvatar|| '/placeholder.svg'} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">
              {userName}
            </span>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {userEmail}
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Logout */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
