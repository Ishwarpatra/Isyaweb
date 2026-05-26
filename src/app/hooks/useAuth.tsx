import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  email: string;
  name: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginSSO: (provider: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("isya_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        sessionStorage.removeItem("isya_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Artificial latency for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lowerEmail = email.toLowerCase().trim();
    const isAdminEmail = 
      lowerEmail === "admin@isya.space" || 
      lowerEmail === "internationalspaceyouthassocia@gmail.com" || 
      lowerEmail === "ishwarpatragod@gmail.com";

    if (isAdminEmail && password === "admin123") {
      const adminUser: User = {
        email: lowerEmail,
        name: "Commander Admin",
        role: "admin",
      };
      setUser(adminUser);
      sessionStorage.setItem("isya_user", JSON.stringify(adminUser));
      return true;
    }

    if (lowerEmail === "cadet@isya.space" && password === "password123") {
      const normalUser: User = {
        email: lowerEmail,
        name: "Cadet Chen",
        role: "user",
      };
      setUser(normalUser);
      sessionStorage.setItem("isya_user", JSON.stringify(normalUser));
      return true;
    }

    // For demo purposes, allow custom emails to log in as user if password is correct
    if (lowerEmail && password.length >= 8 && !isAdminEmail) {
      const namePart = lowerEmail.split("@")[0];
      const customUser: User = {
        email: lowerEmail,
        name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
        role: "user",
      };
      setUser(customUser);
      sessionStorage.setItem("isya_user", JSON.stringify(customUser));
      return true;
    }

    return false;
  };

  const loginSSO = async (provider: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const ssoUser: User = {
      email: `sso.${provider.toLowerCase()}@isya.space`,
      name: `${provider} Agent`,
      role: "user",
    };
    setUser(ssoUser);
    sessionStorage.setItem("isya_user", JSON.stringify(ssoUser));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("isya_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginSSO,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
