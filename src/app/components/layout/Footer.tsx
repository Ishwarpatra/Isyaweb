import { Link } from "react-router";
import { Twitter, Youtube, Mail } from "lucide-react";
import logoImg from "../../../imports/Logo_ISYA__1_-2.jpeg";

export function Footer() {
  return (
    <footer className="mt-24 bg-[#000B1A] border-t border-[#4A90E2]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src={logoImg}
                alt="ISYA Logo"
                width="90"
                height="90"
                className="w-[90px] drop-shadow-[0_0_12px_rgba(249,115,22,0.3)] mix-blend-multiply"
              />
            </div>
            <p className="mb-6 text-[#7A8894] text-[0.9rem] leading-relaxed max-w-[320px]">
              International Space Youth Association — connecting the next generation of space
              explorers, scientists, and dreamers across the globe.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
                { icon: Mail, label: "Email", href: "mailto:contact@isya.space" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white mb-4 text-[0.875rem] font-semibold tracking-wider">
              EXPLORE
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "Blog", path: "/blog" },
                { label: "Media", path: "/media" },
                { label: "Community", path: "/community" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#7A8894] text-[0.875rem] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 text-[0.875rem] font-semibold tracking-wider">
              ACCOUNT
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Join ISYA", path: "/register" },
                { label: "Sign In", path: "/login" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#7A8894] text-[0.875rem] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-white/5">
          <p className="text-[#7A8894] text-[0.8rem]">
            © 2026 International Space Youth Association. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[#7A8894] text-xs font-mono">
            <Link to="/guidelines" className="hover:text-white transition-colors">GUIDELINES</Link>
            <span className="text-gray-700">//</span>
            <Link to="/guidelines#terms" className="hover:text-white transition-colors">TERMS_OF_SERVICE</Link>
            <span className="text-gray-700">//</span>
            <Link to="/guidelines#privacy" className="hover:text-white transition-colors">PRIVACY_POLICY</Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-500 text-[0.8rem] font-mono">SECURE_NODE_v4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
