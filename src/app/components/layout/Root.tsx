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
  const showNavbar = !location.pathname.startsWith("/admin");

  return (
    <AuthProvider>
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#0B0F19", color: "#FFFFFF" }}
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-pink-500 focus:text-white focus:rounded-xl focus:font-mono focus:text-xs"
        >
          SKIP_TO_MAIN_CONTENT
        </a>
        {showNavbar && <Navbar />}
        <main id="main-content" className={`flex-1 ${showNavbar ? "pt-16" : ""}`}>
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
