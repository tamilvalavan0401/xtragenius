"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  email: string | null;
  setUserData: (user: User, token: string, email?: string | null) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  });
  const [email, setEmail] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('email');
    }
    return null;
  });

  useEffect(() => {
    // Ensure data is loaded on mount in case of hydration mismatch
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      const storedEmail = localStorage.getItem('email');
      if (storedUser && !user) setUser(JSON.parse(storedUser));
      if (storedToken && !token) setToken(storedToken);
      if (storedEmail && !email) setEmail(storedEmail);
    }
  }, []);

  const setUserData = (user: User, token: string, email?: string | null) => {
    setUser(user);
    setToken(token);
    setEmail(email || user.email || null);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      if (email || user.email) localStorage.setItem('email', email || user.email);
    }
  };

  const clearUserData = () => {
    setUser(null);
    setToken(null);
    setEmail(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    }
  };

  return (
    <UserContext.Provider value={{ user, token, email, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

