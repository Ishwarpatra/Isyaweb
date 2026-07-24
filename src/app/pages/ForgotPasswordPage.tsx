import React, { useState } from "react";
import { Link } from "react-router";
import { API_BASE_URL, API_ENDPOINTS, REGEX } from "../constants";
import { getCsrfHeaders } from "../utils/csrf";

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!REGEX.EMAIL.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getCsrfHeaders(),
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Password reset instructions sent to your email.");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to process request. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold mb-2 text-center text-cyan-400">Reset Your Password</h1>
        <p className="text-slate-400 text-sm mb-6 text-center">
          Enter your registered email address and we'll send you instructions to reset your password.
        </p>

        {status === "success" ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-4 rounded-lg text-sm text-center mb-6">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === "error" && (
              <div className="bg-rose-950/60 border border-rose-500/40 text-rose-300 p-3 rounded-lg text-sm">
                {message}
              </div>
            )}

            <div>
              <label htmlFor="forgot-email" className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Email Address
              </label>
              <input
                id="forgot-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 font-semibold text-slate-950 rounded-lg transition text-sm disabled:opacity-50"
            >
              {status === "loading" ? "Sending Request..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-slate-400">
          Remembered your password?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
