'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Building2,
  Briefcase,
  FileText,
  FolderTree,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  FileBarChart,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
  adminOnly?: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'EMPLOYEE' | 'ADMIN';
  userName: string;
  userEmail: string;
}

export function DashboardLayout({
  children,
  userRole,
  userName,
  userEmail,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const isAdmin = userRole === 'ADMIN';
  const basePath = isAdmin ? '/admin' : '/employee';

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: `${basePath}/dashboard`,
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: 'Companies',
      href: `${basePath}/companies`,
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: 'Jobs',
      href: `${basePath}/jobs`,
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: 'Applications',
      href: `${basePath}/applications`,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: 'Categories',
      href: `${basePath}/categories`,
      icon: <FolderTree className="h-5 w-5" />,
    },
    {
      title: 'Messages',
      href: `${basePath}/messages`,
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: 'Analytics',
      href: `${basePath}/analytics`,
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: <Users className="h-5 w-5" />,
      adminOnly: true,
    },
    {
      title: 'Reports',
      href: '/admin/reports',
      icon: <FileBarChart className="h-5 w-5" />,
      adminOnly: true,
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
      adminOnly: true,
    },
  ];

  const visibleNavItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-foreground">
            {isAdmin ? 'Admin Portal' : 'Employee Portal'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Job Portal System
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-secondary'
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {userEmail}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`${basePath}/profile`}>Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
