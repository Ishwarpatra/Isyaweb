import { useEffect, Suspense } from "react";
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

  useEffect(() => {
    // Sync theme class to document element on mount and route changes
    const storedTheme = localStorage.getItem("isya_theme") || "dark";
    if (storedTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    // 1. Check if there is a hash to scroll to
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          element.setAttribute("tabindex", "-1");
          element.focus({ preventScroll: true });
        }, 100);
        return () => clearTimeout(timer);
      }
    }

    // 2. Otherwise shift focus to #main-content to manage route transition focus context
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus({ preventScroll: true });
    }
  }, [location.pathname, location.hash]);

  return (
    <AuthProvider>
      <div
        className="min-h-screen flex flex-col bg-dark"
        style={{ color: "#FFFFFF" }}
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-pink-500 focus:text-white focus:rounded-xl focus:font-mono focus:text-xs"
        >
          SKIP_TO_MAIN_CONTENT
        </a>
        {showNavbar && <Navbar />}
        <main id="main-content" className={`flex-1 ${showNavbar ? "pt-24" : ""}`}>
          <ErrorBoundary>
            <Suspense fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-t-pink-500 border-r-pink-500 border-b-white/10 border-l-white/10 animate-spin" />
              </div>
            }>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
        {showFooter && <Footer />}
        <ScrollRestoration />
        <Toaster
          closeButton
          position="bottom-right"
          theme="dark"
          toastOptions={{ aria: { role: "status", "aria-live": "assertive" } }}
        />
      </div>
    </AuthProvider>
  );
}
