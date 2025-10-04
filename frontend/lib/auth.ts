import { UserType } from '@/context/auth-context';

export function isEmployee(user: UserType | null): boolean {
  return user?.role === 'EMPLOYEE' || user?.role === 'ADMIN';
}

export function isAdmin(user: UserType | null): boolean {
  return user?.role === 'ADMIN';
}

export function canAccessEmployeeDashboard(user: UserType | null): boolean {
  return isEmployee(user);
}

export function canAccessAdminDashboard(user: UserType | null): boolean {
  return isAdmin(user);
}

export function canManageUsers(user: UserType | null): boolean {
  return isAdmin(user);
}
