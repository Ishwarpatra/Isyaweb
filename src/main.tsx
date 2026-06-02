import * as Sentry from '@sentry/react';
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || "",
  environment: import.meta.env.VITE_ENVIRONMENT || "development",
  tracesSampleRate: 0.1,
});

createRoot(document.getElementById("root")!).render(<App />);