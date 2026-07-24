export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    SEND_VERIFICATION: "/auth/send-verification-email",
    VERIFY_EMAIL: "/auth/verify-email",
  },
  BLOG: "/blog",
  EVENTS: "/events",
  USER: "/user",
  MEDIA: "/media",
} as const;

export const TIMEOUTS = {
  SESSION_IDLE_MS: 30 * 60 * 1000, // 30 minutes
  SESSION_WARNING_MS: 5 * 60 * 1000, // 5 minutes before logout
  API_REQUEST_MS: 15 * 1000, // 15s timeout
} as const;

export const BUNDLE_LIMITS = {
  MAIN_BUNDLE_MAX_KB: 300,
  TOTAL_BUNDLE_MAX_KB: 600,
} as const;

export const FEATURE_FLAGS = {
  ENABLE_REALTIME: import.meta.env.VITE_ENABLE_REALTIME === "true",
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

export * from "./copytext";
