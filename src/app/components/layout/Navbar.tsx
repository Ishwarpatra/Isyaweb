import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigation } from "react-router";
import { Menu, X, LogOut, Shield, Bell } from "lucide-react";
import logoImg from "../../../imports/Logo_ISYA__1_-2.jpeg";
import { useAuth } from "../../hooks/useAuth";
import { lockScroll, unlockScroll } from "../../hooks/useScrollLock";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Media", path: "/media" },
  { label: "Community", path: "/community" },
];

// Derive initial ISO timestamps from now - offsets
const NOW = Date.now();
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: "ALERT", text: "Solar flare activity detected in Sector 4. Satellite links degraded.", timestamp: new Date(NOW - 10 * 60 * 1000).toISOString(), color: "#F97316", read: false },
  { id: 2, type: "SYSTEM", text: "Welcome Cadet! Enlistment credentials verified and synced with node.", timestamp: new Date(NOW - 60 * 60 * 1000).toISOString(), color: "#10B981", read: false },
  { id: 3, type: "MISSION", text: "New coordinated telescope search campaign initiated in Grid-9.", timestamp: new Date(NOW - 4 * 60 * 60 * 1000).toISOString(), color: "#3B82F6", read: true },
];

/** Re-renders every 60 s so relative timestamps stay accurate. */
function useRelativeTime(isoString: string): string {
  const [label, setLabel] = useState(() =>
    formatDistanceToNow(new Date(isoString), { addSuffix: true })
  );
  useEffect(() => {
    const update = () =>
      setLabel(formatDistanceToNow(new Date(isoString), { addSuffix: true }));
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [isoString]);
  return label;
}

/** Single notification row — extracted so each can own its live timestamp. */
function NotificationItem({
  n,
  onKeyDown,
}: {
  n: (typeof INITIAL_NOTIFICATIONS)[number];
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const relTime = useRelativeTime(n.timestamp);
  return (
    <div
      role="menuitem"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`p-2.5 rounded-lg border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 cursor-default ${
        n.read
          ? "bg-white/[0.01] border-white/5 text-gray-400"
          : "bg-pink-500/5 border-pink-500/20 text-gray-300"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[10px] tracking-wider" style={{ color: n.color }}>
          [{n.type}]
        </span>
        <span className="text-[10px] text-gray-400 font-mono" aria-label={new Date(n.timestamp).toLocaleString()}>
          {relTime}
        </span>
      </div>
      <p className="text-xs leading-relaxed font-sans">{n.text}</p>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigation = useNavigation();
  const { user, logout, isAdmin } = useAuth();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bellButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  // Notifications State
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationPanelRef = useRef<HTMLDivElement>(null);

  // Logout confirmation — two-tap UX
  const [logoutPending, setLogoutPending] = useState(false);
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = useCallback(() => {
    if (logoutPending) {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      setLogoutPending(false);
      logout();
      toast.success("Session terminated. Standing by.");
    } else {
      setLogoutPending(true);
      logoutTimerRef.current = setTimeout(() => setLogoutPending(false), 3000);
    }
  }, [logoutPending, logout]);

  const handleMobileLogout = useCallback(() => {
    handleLogout();
    if (logoutPending) closeMenu();
  }, [logoutPending, handleLogout]);

  // Cleanup logout timer on unmount
  useEffect(() => () => { if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current); }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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

  // Notifications keyboard: focus first item + Escape close
  const prevNotificationsOpen = useRef(notificationsOpen);
  useEffect(() => {
    if (notificationsOpen) {
      setTimeout(() => {
        const firstFocusable = notificationPanelRef.current?.querySelector<HTMLElement>(
          '[role="menuitem"]'
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

  // Arrow-key navigation inside notification menu
  const handleNotificationKeyDown = useCallback((e: React.KeyboardEvent) => {
    const items = notificationPanelRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (!items || items.length === 0) return;
    const current = document.activeElement as HTMLElement;
    const idx = Array.from(items).indexOf(current);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[Math.min(idx + 1, items.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[Math.max(idx - 1, 0)]?.focus();
    } else if (e.key === "Escape") {
      setNotificationsOpen(false);
    }
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    // startsWith so /blog/123 keeps the "Blog" link highlighted
    return location.pathname.startsWith(path);
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

    const getFocusable = () =>
      overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

    const focusableElements = getFocusable();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key === "Tab") {
        const elements = getFocusable();
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

  // Close mobile menu when viewport crosses the md (768px) breakpoint.
  // Without this, lockScroll() persists after the overlay is CSS-hidden, permanently
  // trapping scroll on tablet landscape rotations.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches && mobileOpen) {
        setMobileOpen(false);
      }
    };
    mq.addEventListener("change", handleBreakpointChange);
    return () => mq.removeEventListener("change", handleBreakpointChange);
  }, [mobileOpen]);

  // Combine standard and admin links dynamically
  const links = [...navLinks];
  if (isAdmin) {
    links.push({ label: "Admin Panel", path: "/admin" });
  }

  // Routing progress bar: tracks navigation state
  const isNavigating = navigation.state === "loading";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/88 backdrop-blur-[18px] border-b border-[#4A90E2]/15 relative">
      {/* Route transition progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-brand-pink transition-all duration-300 ease-out"
        style={{ width: isNavigating ? "85%" : "0%", opacity: isNavigating ? 1 : 0 }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImg}
              alt="ISYA Home"
              width="160"
              height="40"
              className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,165,0,0.3)] mix-blend-multiply"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EC4899] ${
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
                onClick={() => setNotificationsOpen((prev) => !prev)}
                className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all cursor-pointer relative flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EC4899]"
                aria-label="Toggle notifications"
                aria-expanded={notificationsOpen}
                aria-controls="notification-panel"
                aria-haspopup="menu"
              >
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-pink-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold font-mono animate-[pulse_1.5s_ease-in-out_2]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div
                  id="notification-panel"
                  ref={notificationPanelRef}
                  role="menu"
                  aria-label="System notifications"
                  className="absolute right-0 mt-3 w-80 bg-[#0B0F19]/98 border border-pink-500/20 rounded-2xl shadow-[0_8px_32px_rgba(236,72,153,0.25)] overflow-hidden backdrop-blur-2xl z-50 p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="font-mono text-xs text-pink-500 tracking-wider">// SYSTEM_NOTIFICATIONS</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors cursor-pointer p-2 -mr-2 min-h-[44px] flex items-center"
                        aria-label="Mark all notifications as read"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto overscroll-contain space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-center font-mono text-xs text-gray-400 py-6" role="status">
                        No new alerts
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <NotificationItem
                          key={n.id}
                          n={n}
                          onKeyDown={handleNotificationKeyDown}
                        />
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs text-[#94A3B8] flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl truncate max-w-[120px] md:max-w-[200px]"
                  title={user.name}
                >
                  {isAdmin && <Shield size={12} className="text-pink-500 shrink-0" />}
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    logoutPending
                      ? "text-white bg-red-500 focus-visible:ring-red-500"
                      : "text-[#E2E8F0] hover:text-red-400 focus-visible:ring-red-500"
                  }`}
                  title={logoutPending ? "Click again to confirm sign out" : "Sign Out"}
                >
                  <LogOut className="w-4 h-4" />
                  {logoutPending ? "Confirm Sign Out" : "Sign Out"}
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl transition-all duration-200 text-[#E2E8F0] text-sm font-medium hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EC4899]"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl transition-all duration-300 text-white text-sm font-semibold shadow-[0_0_18px_rgba(255,165,0,0.28)] bg-gradient-to-br from-[#FFA500] to-[#EC4899] bg-[length:200%_auto] hover:shadow-[0_0_28px_rgba(236,72,153,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EC4899]"
                >
                  Join ISYA
                </Link>
              </>
            )}
          </div>

          <button
            ref={menuButtonRef}
            className="md:hidden p-2 rounded-lg text-[#B0B8C1] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EC4899]"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          ref={overlayRef}
          className="md:hidden absolute top-full left-0 right-0 z-40 bg-[#0B0F19]/98 border-t border-[#4A90E2]/10 overflow-y-auto overscroll-y-contain max-h-[calc(100dvh-4rem)]"
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
                  <div className="px-4 py-2 font-mono text-xs text-[#94A3B8] truncate" title={user.name}>
                    <span aria-label={`Logged in as ${user.name}, role ${user.role}`}>
                      Logged in as: {user.name} ({user.role.toUpperCase()})
                    </span>
                  </div>
                  <button
                    onClick={handleMobileLogout}
                    className={`flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-center text-[0.9rem] font-medium transition-colors ${
                      logoutPending
                        ? "text-white bg-red-500"
                        : "text-red-400 bg-red-500/5 hover:bg-red-500/10"
                    }`}
                  >
                    <LogOut size={16} />
                    {logoutPending ? "Tap again to Sign Out" : "Sign Out"}
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
