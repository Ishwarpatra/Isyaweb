import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";
import { toast } from "sonner";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email address");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter valid email coordinates");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Security reset token sent to your email coordinates!");
      navigate("/login");
    }, 1200);
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
            // SECURITY_RELAY :: KEY_RECOVERY
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 bg-gray-900/70 backdrop-blur-2xl border border-pink-500/15 shadow-2xl relative hud-corners">
          <h2 className="text-white text-xl font-bold tracking-tight mb-2">Reset Access</h2>
          <p className="text-gray-400 text-xs font-mono leading-relaxed mb-6">
            Enter your coordinates to generate a security reset token.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block font-mono text-xs text-gray-500 tracking-widest mb-2">
                REGISTERED_EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="agent@isya.space"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-transparent border-b py-3 text-white text-sm outline-none transition-colors ${
                  error ? "border-red-500" : "border-white/10 focus:border-pink-500"
                }`}
              />
              {error && (
                <p className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-red-400">
                  <AlertCircle size={12} />
                  {error}
                </p>
              )}
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
              {loading ? "TRANSMITTING..." : "GENERATE_RESET_KEY"}
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
