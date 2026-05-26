import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import logoImg from "../../../imports/Logo_ISYA__1_-2.jpeg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Media", path: "/media" },
  { label: "Community", path: "/community" },
  { label: "ETS Workspace", path: "/ets" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(11, 15, 25, 0.88)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(74, 144, 226, 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImg}
              alt="ISYA — International Space Youth Association"
              className="h-10 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 8px rgba(255,165,0,0.3))" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 rounded-lg transition-all duration-300"
                style={{
                  color: isActive(link.path) ? "#FFA500" : "#B0B8C1",
                  background: isActive(link.path) ? "rgba(255, 165, 0, 0.08)" : "transparent",
                  fontSize: "0.875rem",
                  fontWeight: isActive(link.path) ? 600 : 400,
                }}
              >
                {link.label}
                {isActive(link.path) && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "#FFA500" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl transition-all duration-200"
              style={{ color: "#B0B8C1", fontSize: "0.875rem", fontWeight: 500 }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-xl transition-all duration-300 btn-press"
              style={{
                background: "linear-gradient(135deg, #FFA500 0%, #EC4899 100%)",
                backgroundSize: "200% auto",
                color: "#fff",
                fontSize: "0.875rem",
                fontWeight: 600,
                boxShadow: "0 0 18px rgba(255, 165, 0, 0.28)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(236, 72, 153, 0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 18px rgba(255, 165, 0, 0.28)";
              }}
            >
              Join ISYA
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#B0B8C1" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: "rgba(11, 15, 25, 0.98)",
            borderTop: "1px solid rgba(74, 144, 226, 0.1)",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  color: isActive(link.path) ? "#FFA500" : "#B0B8C1",
                  background: isActive(link.path) ? "rgba(255, 165, 0, 0.08)" : "transparent",
                  fontSize: "0.9rem",
                  fontWeight: isActive(link.path) ? 600 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="flex flex-col gap-2 mt-3 pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-center"
                style={{ color: "#B0B8C1", fontSize: "0.9rem" }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-center btn-press"
                style={{
                  background: "linear-gradient(135deg, #FFA500, #EC4899)",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Join ISYA
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
