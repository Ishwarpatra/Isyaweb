import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "moderator" | "mentor" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginSSO: (provider: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
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
    await new Promise((resolve) => setTimeout(resolve, 150));

    const lowerEmail = email.toLowerCase().trim();
    const isAdminEmail = 
      lowerEmail === "admin@isya.space" || 
      lowerEmail === "internationalspaceyouthassocia@gmail.com" || 
      lowerEmail === "ishwarpatragod@gmail.com";

    if (isAdminEmail && password === "admin123") {
      const adminUser: User = {
        id: "usr-admin",
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
        id: "usr-cadet",
        email: lowerEmail,
        name: "Cadet Chen",
        role: "user",
      };
      setUser(normalUser);
      sessionStorage.setItem("isya_user", JSON.stringify(normalUser));
      return true;
    }

    if (lowerEmail === "moderator@isya.space" && password === "moderator123") {
      const modUser: User = {
        id: "usr-mod",
        email: lowerEmail,
        name: "Officer Mod",
        role: "moderator",
      };
      setUser(modUser);
      sessionStorage.setItem("isya_user", JSON.stringify(modUser));
      return true;
    }

    if (lowerEmail === "mentor@isya.space" && password === "mentor123") {
      const mentorUser: User = {
        id: "usr-mentor",
        email: lowerEmail,
        name: "Instructor Mentor",
        role: "mentor",
      };
      setUser(mentorUser);
      sessionStorage.setItem("isya_user", JSON.stringify(mentorUser));
      return true;
    }

    // For demo purposes, allow custom emails to log in as user if password is correct
    if (lowerEmail && password.length >= 8 && !isAdminEmail) {
      const namePart = lowerEmail.split("@")[0];
      let assignedRole: "admin" | "moderator" | "mentor" | "user" = "user";
      
      // Let special user names register or login as mods/mentors for review testing
      if (namePart.includes("mod")) assignedRole = "moderator";
      else if (namePart.includes("mentor")) assignedRole = "mentor";
      else if (namePart.includes("admin")) assignedRole = "admin";

      const customUser: User = {
        id: `usr-${namePart}-${Date.now().toString(36)}`,
        email: lowerEmail,
        name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
        role: assignedRole,
      };
      setUser(customUser);
      sessionStorage.setItem("isya_user", JSON.stringify(customUser));
      return true;
    }

    return false;
  };

  const loginSSO = async (provider: string) => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const ssoUser: User = {
      id: `usr-sso-${provider.toLowerCase()}`,
      email: `sso.${provider.toLowerCase()}@isya.space`,
      name: `${provider} Agent`,
      role: "user",
    };
    setUser(ssoUser);
    sessionStorage.setItem("isya_user", JSON.stringify(ssoUser));
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const lowerEmail = email.toLowerCase().trim();
    
    let assignedRole: "admin" | "moderator" | "mentor" | "user" = "user";
    const namePart = lowerEmail.split("@")[0];
    if (namePart.includes("mod") || lowerEmail === "moderator@isya.space") assignedRole = "moderator";
    else if (namePart.includes("mentor") || lowerEmail === "mentor@isya.space") assignedRole = "mentor";
    else if (namePart.includes("admin") || lowerEmail === "admin@isya.space") assignedRole = "admin";

    const newUser: User = {
      id: `usr-${namePart}-${Date.now().toString(36)}`,
      email: lowerEmail,
      name,
      role: assignedRole,
    };
    setUser(newUser);
    sessionStorage.setItem("isya_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("isya_user");
    sessionStorage.removeItem("isya_admin_decrypted");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginSSO,
        logout,
        register,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isModerator: user?.role === "moderator" || user?.role === "admin",
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
