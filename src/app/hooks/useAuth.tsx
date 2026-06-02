import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'moderator' | 'admin';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isModerator: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // Check if user is already logged in (from httpOnly cookie)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${apiBase}/api/auth/me`, {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        // User not authenticated, continue
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [apiBase]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await res.json();
      setUser(data.user);
      toast.success('Logged in successfully!');
      return true;

    } catch (err: any) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Registration failed');
      }

      const data = await res.json();
      setUser(data.user);
      toast.success('Account created successfully!');
      return true;

    } catch (err: any) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${apiBase}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      toast.success('Logged out');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        isModerator: user?.role === 'moderator' || user?.role === 'admin',
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
