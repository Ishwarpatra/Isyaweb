import * as Sentry from '@sentry/react';
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Defer Sentry init until after the page is interactive to avoid blocking FCP
const initSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || "",
    environment: import.meta.env.VITE_ENVIRONMENT || "development",
    tracesSampleRate: 0.1,
  });
};

if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initSentry);
  } else {
    setTimeout(initSentry, 1000);
  }
}

createRoot(document.getElementById("root")!).render(<App />);