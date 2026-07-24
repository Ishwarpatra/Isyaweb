/**
 * Environment configuration and schema validation.
 */
interface Config {
  apiBaseUrl: string;
  enableRealtime: boolean;
  enableAnalytics: boolean;
  sentryDsn?: string;
}

function validateEnv(): Config {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  
  if (import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL) {
    console.warn("[Env Warning] VITE_API_BASE_URL is not explicitly set in production mode.");
  }

  return {
    apiBaseUrl,
    enableRealtime: import.meta.env.VITE_ENABLE_REALTIME === "true",
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  };
}

export const envConfig = validateEnv();
