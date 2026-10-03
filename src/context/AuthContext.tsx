'use client';

import * as React from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  joinedDate: string;
  keepSignedIn?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, keepSignedIn?: boolean) => { success: boolean; error?: string };
  signup: (name: string, email: string, password?: string, keepSignedIn?: boolean) => { success: boolean; error?: string };
  logout: () => void;
  demoLogin: (role?: 'shopper' | 'hiring_reviewer') => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'amazon_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [mounted, setMounted] = React.useState(false);

  // Hydrate user from localStorage on mount
  React.useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Listen to storage events across tabs
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = React.useCallback(
    (email: string, password?: string, keepSignedIn: boolean = true) => {
      const cleanEmail = email.trim();
      if (!cleanEmail || !cleanEmail.includes('@')) {
        return { success: false, error: 'Please enter a valid email address.' };
      }

      // Generate or derive a friendly name from email
      const namePart = cleanEmail.split('@')[0];
      const displayName =
        cleanEmail.toLowerCase() === 'hiring@decidefaster.com'
          ? 'Hiring Team Evaluator'
          : cleanEmail.toLowerCase().includes('ansika')
          ? 'Ansika Singh'
          : namePart.charAt(0).toUpperCase() + namePart.slice(1);

      const newUser: User = {
        id: 'usr-' + Math.random().toString(36).substring(2, 9),
        name: displayName,
        email: cleanEmail,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        keepSignedIn,
      };

      setUser(newUser);
      if (keepSignedIn) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      }

      return { success: true };
    },
    []
  );

  const signup = React.useCallback(
    (name: string, email: string, password?: string, keepSignedIn: boolean = true) => {
      const cleanName = name.trim();
      const cleanEmail = email.trim();

      if (!cleanName) {
        return { success: false, error: 'Please enter your full name.' };
      }
      if (!cleanEmail || !cleanEmail.includes('@')) {
        return { success: false, error: 'Please enter a valid email address.' };
      }
      if (password && password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters.' };
      }

      const newUser: User = {
        id: 'usr-' + Math.random().toString(36).substring(2, 9),
        name: cleanName,
        email: cleanEmail,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        keepSignedIn,
      };

      setUser(newUser);
      if (keepSignedIn) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      }

      return { success: true };
    },
    []
  );

  const logout = React.useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const demoLogin = React.useCallback(
    (role: 'shopper' | 'hiring_reviewer' = 'hiring_reviewer') => {
      const demoUser: User =
        role === 'hiring_reviewer'
          ? {
              id: 'usr-evaluator',
              name: 'Hiring Team Reviewer',
              email: 'hiring@decidefaster.com',
              role: 'Senior Hiring Evaluator',
              joinedDate: 'Oct 2026',
              keepSignedIn: true,
            }
          : {
              id: 'usr-ansika',
              name: 'Ansika Singh',
              email: 'ansika.singh@decidefaster.com',
              role: 'Prime Member',
              joinedDate: 'Jan 2024',
              keepSignedIn: true,
            };

      setUser(demoUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    },
    []
  );

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      demoLogin,
    }),
    [user, login, signup, logout, demoLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
