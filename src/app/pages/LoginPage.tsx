import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022"/>
      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00"/>
      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/>
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
    </svg>
  );
}

const SSO_PROVIDERS = [
  { id: "Google", label: "Google", Icon: GoogleIcon },
  { id: "Microsoft", label: "Microsoft", Icon: MicrosoftIcon },
  { id: "Apple", label: "Apple", Icon: AppleIcon },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginSSO } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSSO, setActiveSSO] = useState<string | null>(null);

  // Field validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (val: string) => {
    if (!val) {
      setEmailError("Agent email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError("Please enter a valid secure email coordinates");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (val: string) => {
    if (!val) {
      setPasswordError("Passphrase is required");
      return false;
    }
    if (val.length < 8) {
      setPasswordError("Security key must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPassValid = validatePassword(password);

    if (!isEmailValid || !isPassValid) {
      toast.error("Form validation failed. Please check credentials.");
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Authentication successful. Access granted!");
        // Determine role redirect
        const lowerEmail = email.toLowerCase().trim();
        const isAdmin = 
          lowerEmail === "admin@isya.space" || 
          lowerEmail === "internationalspaceyouthassocia@gmail.com" || 
          lowerEmail === "ishwarpatragod@gmail.com";
        
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("ACCESS_DENIED: Invalid agent credentials.");
        setPasswordError("Incorrect email or security passphrase");
      }
    } catch (err) {
      toast.error("System error during credential verification.");
    } finally {
      setLoading(false);
    }
  };

  const handleSSOLogin = async (provider: string) => {
    setLoading(true);
    setActiveSSO(provider);
    try {
      await loginSSO(provider);
      toast.success(`SSO access granted via ${provider}!`);
      navigate("/");
    } catch (err) {
      toast.error(`SSO handshake failed with ${provider}.`);
    } finally {
      setLoading(false);
      setActiveSSO(null);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#0B0F19] stardust">
      {/* Background breathing glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow bg-pink-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none animate-pulse-glow bg-blue-500/10 blur-[110px] [animation-delay:3s]" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo + Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full animate-pulse-glow bg-orange-500/20 blur-[24px] scale-125" />
            <img
              src={logoImg}
              alt="ISYA Logo"
              width="90"
              height="90"
              className="relative w-[90px] animate-float drop-shadow-[0_0_18px_rgba(249,115,22,0.5)] mix-blend-multiply"
            />
          </div>
          <div className="flex items-center gap-2 mb-3 font-mono text-xs text-pink-500 tracking-[0.15em]">
            <span className="animate-live-pulse inline-block w-1.5 h-1.5 rounded-full bg-pink-500" />
            AUTH_PORTAL // SECURE_ACCESS
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight mb-1 text-center">
            Access Terminal
          </h1>
          <p className="text-gray-400 font-mono text-xs tracking-wider">
            CREDENTIAL_VERIFICATION_REQUIRED
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 bg-gray-900/70 backdrop-blur-2xl border border-pink-500/15 shadow-2xl relative hud-corners">
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block font-mono text-xs text-gray-400 tracking-widest mb-2">
                AGENT_IDENTIFIER // EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="agent@isya.space"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
                className={`w-full bg-transparent border-b py-3 text-white text-sm outline-none transition-colors ${
                  emailError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-pink-500"
                }`}
              />
              {emailError && (
                <p id="email-error" className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-red-400">
                  <AlertCircle size={12} />
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="font-mono text-xs text-gray-400 tracking-widest">
                  SECURITY_PASSPHRASE
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) validatePassword(e.target.value);
                  }}
                  onBlur={(e) => validatePassword(e.target.value)}
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "password-error" : undefined}
                  className={`w-full bg-transparent border-b py-3 pr-10 text-white text-sm outline-none transition-colors ${
                    passwordError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-pink-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordError && (
                <p id="password-error" className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-red-400">
                  <AlertCircle size={12} />
                  {passwordError}
                </p>
              )}

              <div className="flex justify-end mt-2">
                <Link
                  to="/reset-password"
                  title="Reset access"
                  className="font-mono text-xs text-pink-500 tracking-wider hover:text-pink-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
                >
                  RESET_ACCESS?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest text-white shadow-lg transition-all cursor-pointer ${
                loading 
                  ? "bg-pink-500/30 cursor-not-allowed" 
                  : "bg-gradient-to-r from-pink-500 to-blue-500 shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <ShieldCheck size={16} className="animate-pulse" />
                  AUTHENTICATING...
                </span>
              ) : (
                "INITIATE_ACCESS // SIGN_IN"
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-gray-400 font-mono text-xs">OR</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* SSO Providers */}
          <div className="mb-6">
            <p className="font-mono text-xs text-gray-400 tracking-widest mb-3">
              // SSO_PROTOCOL_SELECT
            </p>
            <div className="flex gap-2">
              {SSO_PROVIDERS.map(({ id, label, Icon }) => {
                const isThisLoading = activeSSO === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSSOLogin(id)}
                    disabled={loading}
                    aria-label={`Sign in with ${label}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isThisLoading ? (
                      <span className="w-3.5 h-3.5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin shrink-0" />
                    ) : (
                      <Icon className="shrink-0" />
                    )}
                    <span className="font-mono text-xs font-medium">
                      {isThisLoading ? "CONNECTING..." : label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <p className="font-mono text-gray-500 text-xs">NO_CLEARANCE?</p>
            <Link
              to="/register"
              className="font-mono text-xs font-bold text-pink-500 tracking-widest hover:text-pink-400 transition-colors"
            >
              REQUEST_ENLISTMENT →
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 font-mono text-xs text-gray-500 tracking-[0.2em]">
          ISYA_SECURE_NODE // ENCRYPTED_CHANNEL // v4.0
        </p>
      </div>
    </div>
  );
}
