import { Link } from "react-router";
import { Twitter, Youtube, Mail } from "lucide-react";
import logoImg from "../../../imports/Logo_ISYA__1_-2.jpeg";

export function Footer() {
  return (
    <footer
      className="mt-24"
      style={{
        background: "#000B1A",
        borderTop: "1px solid rgba(74, 144, 226, 0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src={logoImg}
                alt="ISYA — International Space Youth Association"
                style={{
                  width: 90,
                  filter: "drop-shadow(0 0 12px rgba(249,115,22,0.3))",
                }}
              />
            </div>
            <p className="mb-6" style={{ color: "#7A8894", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 320 }}>
              International Space Youth Association — connecting the next generation of space
              explorers, scientists, and dreamers across the globe.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(74, 144, 226, 0.1)",
                    color: "#4A90E2",
                    border: "1px solid rgba(74, 144, 226, 0.2)",
                  }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.875rem", letterSpacing: "0.05em" }}>
              EXPLORE
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "Blog", path: "/blog" },
                { label: "Media Hub", path: "/media" },
                { label: "Community", path: "/community" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="transition-colors duration-200"
                    style={{ color: "#7A8894", fontSize: "0.875rem" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.875rem", letterSpacing: "0.05em" }}>
              ACCOUNT
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Join ISYA", path: "/register" },
                { label: "Sign In", path: "/login" },
                { label: "Admin Portal", path: "/admin" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="transition-colors duration-200"
                    style={{ color: "#7A8894", fontSize: "0.875rem" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p style={{ color: "#7A8894", fontSize: "0.8rem" }}>
            © 2026 International Space Youth Association. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors duration-200"
                style={{ color: "#7A8894", fontSize: "0.8rem" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
