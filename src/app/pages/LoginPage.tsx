import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022"/>
      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00"/>
      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/>
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
    </svg>
  );
}

const SSO_PROVIDERS = [
  { id: "google", label: "Google", Icon: GoogleIcon },
  { id: "microsoft", label: "Microsoft", Icon: MicrosoftIcon },
  { id: "apple", label: "Apple", Icon: AppleIcon },
];

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden stardust"
      style={{ background: "#0B0F19" }}
    >
      {/* Background breathing glow blobs */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: "rgba(236,72,153,0.12)", filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: "rgba(59,130,246,0.1)", filter: "blur(110px)", animationDelay: "3s" }}
      />
      <div
        className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: "rgba(249,115,22,0.08)", filter: "blur(100px)", animationDelay: "6s" }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo + Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{ background: "rgba(249,115,22,0.3)", filter: "blur(24px)", transform: "scale(1.2)" }}
            />
            <img
              src={logoImg}
              alt="ISYA"
              className="relative mx-auto animate-float"
              style={{ width: 90, filter: "drop-shadow(0 0 18px rgba(249,115,22,0.5))" }}
            />
          </div>
          <div
            className="flex items-center gap-2 mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#EC4899", letterSpacing: "0.15em" }}
          >
            <span className="animate-live-pulse inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#EC4899" }} />
            AUTH_PORTAL // SECURE_ACCESS
          </div>
          <h1 className="text-white mb-1 text-center" style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Access Terminal
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.85rem", fontFamily: "'JetBrains Mono', monospace" }}>
            CREDENTIAL_VERIFICATION_REQUIRED
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 relative hud-corners"
          style={{
            background: "rgba(17,24,39,0.7)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(236,72,153,0.15)",
            boxShadow: "0 0 60px rgba(236,72,153,0.05), 0 25px 50px rgba(0,0,0,0.4)",
          }}
        >
          {/* SSO Providers */}
          <div className="mb-6">
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "#4B5563",
                letterSpacing: "0.12em",
                marginBottom: "0.75rem",
              }}
            >
              // SSO_PROTOCOL_SELECT
            </p>
            <div className="flex gap-2">
              {SSO_PROVIDERS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#9CA3AF",
                    fontSize: "0.78rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(236,72,153,0.3)";
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(236,72,153,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <Icon />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span style={{ color: "#374151", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace" }}>OR</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#6B7280",
                  letterSpacing: "0.12em",
                }}
              >
                AGENT_IDENTIFIER // EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="agent@isya.space"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glow w-full px-1 py-3 outline-none"
                style={{
                  color: "#F9FAFB",
                  fontSize: "0.95rem",
                  background: "transparent",
                  caretColor: "#EC4899",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#6B7280",
                    letterSpacing: "0.12em",
                  }}
                >
                  SECURITY_PASSPHRASE
                </label>
                <a
                  href="#"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#EC4899",
                    letterSpacing: "0.08em",
                  }}
                >
                  RESET_ACCESS?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glow w-full px-1 py-3 pr-10 outline-none"
                  style={{
                    color: "#F9FAFB",
                    fontSize: "0.95rem",
                    background: "transparent",
                    caretColor: "#EC4899",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 transition-colors duration-150"
                  style={{ color: "#4B5563" }}
                  aria-label="Toggle password visibility"
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#EC4899")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#4B5563")}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden"
              style={{
                background: loading
                  ? "rgba(236,72,153,0.3)"
                  : "linear-gradient(135deg, #EC4899 0%, #3B82F6 100%)",
                color: "#fff",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                boxShadow: loading ? "none" : "0 0 30px rgba(236,72,153,0.35), 0 4px 15px rgba(0,0,0,0.3)",
                cursor: loading ? "not-allowed" : "pointer",
                border: "none",
              }}
            >
              {loading ? "AUTHENTICATING..." : "INITIATE_ACCESS // SIGN_IN"}
            </button>
          </form>

          {/* Status line */}
          <div
            className="mt-6 pt-4 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <p style={{ color: "#374151", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace" }}>
              NO_CLEARANCE?
            </p>
            <Link
              to="/register"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "#EC4899",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              REQUEST_ENLISTMENT →
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p
          className="text-center mt-6"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#1F2937", letterSpacing: "0.1em" }}
        >
          ISYA_SECURE_NODE // ENCRYPTED_CHANNEL // v4.0
        </p>
      </div>
    </div>
  );
}
