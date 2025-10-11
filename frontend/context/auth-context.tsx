'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export interface UserType {
  id: number;
  fullName: string;
  email: string;
  resume: string;
  profile: string;
  phoneNumber: string;
  skills: string;
  bio: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'JOBSEEKER';
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (user: UserType, token: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');

    if (storedUser && authToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Store in localStorage when state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem(
        'authToken',
        localStorage.getItem('authToken') || ''
      );
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  }, [isAuthenticated, user]);

  const login = (user: UserType, token: string) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
