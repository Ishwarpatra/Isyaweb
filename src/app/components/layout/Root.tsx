import { Outlet, useLocation, ScrollRestoration } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AuthProvider } from "../../hooks/useAuth";
import { Toaster } from "../ui/sonner";
import { ErrorBoundary } from "../ErrorBoundary";

const HIDE_FOOTER_PATHS = ["/login", "/register", "/admin"];

export function Root() {
  const location = useLocation();
  const showFooter = !HIDE_FOOTER_PATHS.some((p) => location.pathname.startsWith(p));

  return (
    <AuthProvider>
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#0B0F19", color: "#FFFFFF" }}
      >
        <Navbar />
        <main className="flex-1 pt-16">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        {showFooter && <Footer />}
        <ScrollRestoration />
        <Toaster closeButton position="bottom-right" theme="dark" />
      </div>
    </AuthProvider>
  );
}
