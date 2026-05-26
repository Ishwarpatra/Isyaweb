import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, LogOut, Shield } from "lucide-react";
import logoImg from "../../../imports/Logo_ISYA__1_-2.jpeg";
import { useAuth } from "../../hooks/useAuth";
import { lockScroll, unlockScroll } from "../../hooks/useScrollLock";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Media", path: "/media" },
  { label: "Community", path: "/community" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;

    lockScroll();

    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = overlay.querySelectorAll<HTMLElement>(focusableSelector);
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const elements = overlay.querySelectorAll<HTMLElement>(focusableSelector);
        if (elements.length === 0) return;

        const firstEl = elements[0];
        const lastEl = elements[elements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unlockScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, closeMenu]);

  // Combine standard and admin links dynamically
  const links = [...navLinks];
  if (isAdmin) {
    links.push({ label: "Admin Panel", path: "/admin" });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/88 backdrop-blur-[18px] border-b border-[#4A90E2]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group" aria-label="ISYA Home">
            <img
              src={logoImg}
              alt="ISYA Logo"
              width="160"
              height="40"
              className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,165,0,0.3)]"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 ${
                  isActive(link.path) ? "text-[#FFA500] bg-[#FFA500]/8 font-semibold" : "text-[#E2E8F0] font-normal hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FFA500]" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#94A3B8] flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  {isAdmin && <Shield size={12} className="text-pink-500" />}
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-200 text-[#E2E8F0] text-sm font-medium hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl transition-all duration-200 text-[#E2E8F0] text-sm font-medium hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl transition-all duration-300 text-white text-sm font-semibold shadow-[0_0_18px_rgba(255,165,0,0.28)] bg-gradient-to-br from-[#FFA500] to-[#EC4899] bg-[length:200%_auto] hover:shadow-[0_0_28px_rgba(236,72,153,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                >
                  Join ISYA
                </Link>
              </>
            )}
          </div>

          <button
            ref={menuButtonRef}
            className="md:hidden p-2 rounded-lg text-[#B0B8C1] hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div 
          ref={overlayRef}
          className="md:hidden fixed inset-0 top-16 z-40 bg-[#0B0F19]/98 border-t border-[#4A90E2]/10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`px-4 py-3 rounded-xl transition-all duration-200 text-[0.9rem] ${
                  isActive(link.path) ? "text-[#FFA500] bg-[#FFA500]/8 font-semibold" : "text-[#CBD5E1] font-normal hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/6">
              {user ? (
                <>
                  <div className="px-4 py-2 font-mono text-xs text-[#94A3B8]">
                    Logged in as: {user.name} ({user.role.toUpperCase()})
                  </div>
                  <button
                    onClick={() => { logout(); closeMenu(); }}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-center text-red-400 text-[0.9rem] font-medium bg-red-500/5 hover:bg-red-500/10"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-center text-[#CBD5E1] text-[0.9rem] hover:text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-center text-white text-[0.9rem] font-semibold bg-gradient-to-r from-[#FFA500] to-[#EC4899]"
                  >
                    Join ISYA
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
