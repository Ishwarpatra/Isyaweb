import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, LogOut, Shield, Bell } from "lucide-react";
import logoImg from "../../../imports/Logo_ISYA__1_-2.jpeg";
import { useAuth } from "../../hooks/useAuth";
import { lockScroll, unlockScroll } from "../../hooks/useScrollLock";
import { toast } from "sonner";

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
  const bellButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, type: "ALERT", text: "Solar flare activity detected in Sector 4. Satellite links degraded.", time: "10m ago", color: "#F97316", read: false },
    { id: 2, type: "SYSTEM", text: "Welcome Cadet! Enlistment credentials verified and synced with node.", time: "1h ago", color: "#10B981", read: false },
    { id: 3, type: "MISSION", text: "New coordinated telescope search campaign initiated in Grid-9.", time: "4h ago", color: "#3B82F6", read: true }
  ]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationPanelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All alerts logged as read.");
  };

  // Close notifications on outside click
  useEffect(() => {
    if (!notificationsOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        notificationPanelRef.current && 
        !notificationPanelRef.current.contains(e.target as Node) &&
        bellButtonRef.current &&
        !bellButtonRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [notificationsOpen]);

  // Notifications keyboard focus and Escape key tracking
  const prevNotificationsOpen = useRef(notificationsOpen);
  useEffect(() => {
    if (notificationsOpen) {
      // Focus first interactive element inside notification panel
      setTimeout(() => {
        const firstFocusable = notificationPanelRef.current?.querySelector<HTMLElement>(
          'button, [tabindex="0"]'
        );
        firstFocusable?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setNotificationsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } else if (prevNotificationsOpen.current) {
      bellButtonRef.current?.focus();
    }
    prevNotificationsOpen.current = notificationsOpen;
  }, [notificationsOpen]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  // Mobile menu focus trap and backdrop close listener
  useEffect(() => {
    const mainEl = document.getElementById("main-content");
    const footerEl = document.querySelector("footer");

    if (!mobileOpen) {
      mainEl?.removeAttribute("aria-hidden");
      footerEl?.removeAttribute("aria-hidden");
      if (lastActiveElement.current) {
        lastActiveElement.current.focus();
        lastActiveElement.current = null;
      }
      return;
    }

    lastActiveElement.current = document.activeElement as HTMLElement;
    lockScroll();
    mainEl?.setAttribute("aria-hidden", "true");
    footerEl?.setAttribute("aria-hidden", "true");

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

    const handleOutsideClick = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      unlockScroll();
      mainEl?.removeAttribute("aria-hidden");
      footerEl?.removeAttribute("aria-hidden");
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
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
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button 
                ref={bellButtonRef}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all cursor-pointer relative flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
                aria-label="Toggle notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-pink-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold font-mono animate-[pulse_1.5s_ease-in-out_2]">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {notificationsOpen && (
                <div 
                  ref={notificationPanelRef}
                  className="absolute right-0 mt-3 w-80 bg-[#0B0F19]/98 border border-pink-500/20 rounded-2xl shadow-[0_8px_32px_rgba(236,72,153,0.25)] overflow-hidden backdrop-blur-2xl animate-slide-up z-50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="font-mono text-xs text-pink-500 tracking-wider">// SYSTEM_NOTIFICATIONS</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[9px] font-mono text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        MARK_ALL_READ
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-center font-mono text-xs text-gray-400 py-6">[!] NO_NEW_ALERTS</p>
                    ) : (
                      notifications.map((n) => (
                        <div 
                          key={n.id} 
                          tabIndex={0}
                          className={`p-2.5 rounded-lg border text-left transition-all focus:outline-none focus:ring-1 focus:ring-pink-500/50 ${
                            n.read 
                              ? "bg-white/[0.01] border-white/5 text-gray-400" 
                              : "bg-pink-500/5 border-pink-500/20 text-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[9px] tracking-wider" style={{ color: n.color }}>[{n.type}]</span>
                            <span className="text-[8px] text-gray-400 font-mono">{n.time}</span>
                          </div>
                          <p className="text-xs leading-relaxed font-sans">{n.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

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
