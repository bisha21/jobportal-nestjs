'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

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
  token: string | null;
  login: (user: UserType, token: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Store in localStorage when state changes
  useEffect(() => {
    if (isAuthenticated && user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  }, [isAuthenticated, user, token]);

  const login = (user: UserType, token: string) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    Cookies.remove('authToken');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, isLoading }}
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
