import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";
import { toast } from "sonner";
import { API_BASE_URL, API_ENDPOINTS, REGEX } from "../constants";
import { getCsrfHeaders } from "../utils/csrf";

export function ResetPasswordPage() {
  const { token } = useParams<{ token?: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Missing or invalid security token parameter in URL.");
      return;
    }

    if (!password) {
      setError("Please enter a new security key");
      return;
    }

    if (!REGEX.PASSWORD.test(password)) {
      setError("Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Security keys do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.RESET_PASSWORD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getCsrfHeaders(),
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Security access token updated successfully!");
        navigate("/login");
      } else {
        setError(data.message || "Failed to update password token.");
      }
    } catch {
      setError("Relay network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#0B0F19] stardust">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow bg-pink-500/10 blur-[120px]" />
      <div className="w-full max-w-sm relative z-10">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img
            src={logoImg}
            alt="ISYA Logo"
            width="90"
            height="90"
            className="w-[90px] mb-4 animate-float drop-shadow-[0_0_18px_rgba(249,115,22,0.4)] mix-blend-multiply"
          />
          <p className="font-mono text-pink-500 text-xs tracking-[0.2em]">
            // SECURITY_RELAY :: UPDATE_KEY
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 bg-gray-900/70 backdrop-blur-2xl border border-pink-500/15 shadow-2xl relative hud-corners">
          <h2 className="text-white text-xl font-bold tracking-tight mb-2">Set New Password</h2>
          <p className="text-gray-400 text-xs font-mono leading-relaxed mb-6">
            Provide your new security key credentials below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {error && (
              <p className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg flex items-center gap-1.5 font-mono text-[11px] text-red-400">
                <AlertCircle size={14} className="shrink-0" />
                {error}
              </p>
            )}

            <div>
              <label htmlFor="new-password" className="block font-mono text-xs text-gray-500 tracking-widest mb-2">
                NEW_SECURITY_KEY
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 pr-10 text-white text-sm outline-none focus:border-pink-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block font-mono text-xs text-gray-500 tracking-widest mb-2">
                CONFIRM_SECURITY_KEY
              </label>
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest text-white shadow-lg transition-all cursor-pointer ${
                loading 
                  ? "bg-pink-500/30 cursor-not-allowed" 
                  : "bg-gradient-to-r from-pink-500 to-blue-500 shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-0.5"
              }`}
            >
              {loading ? "SAVING..." : "COMMIT_NEW_KEY"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <Link to="/login" className="flex items-center gap-1.5 font-mono text-xs font-bold text-pink-500 tracking-wider hover:text-pink-400 transition-colors">
              <ArrowLeft size={14} />
              ACCESS_TERMINAL
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
