import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";

const INTERESTS = ["Astrophysics", "Robotics / Engineering", "Space Communications", "Astrobiology", "Data Science & AI", "Aerospace Design", "Space Policy", "Science Communication"];

const STEPS = [
  { id: 1, code: "IDENTIFICATION", label: "Identity" },
  { id: 2, code: "SPECIALIZATION", label: "Mission Role" },
  { id: 3, code: "CLEARANCE",      label: "Security" },
];

function shieldStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  const levels = [
    { label: "CRITICAL", color: "#EF4444" },
    { label: "WEAK", color: "#F97316" },
    { label: "NOMINAL", color: "#F59E0B" },
    { label: "STRONG", color: "#10B981" },
    { label: "MAXIMUM", color: "#3B82F6" },
  ];
  return { score, ...levels[Math.min(score, 4)] };
}

export function RegisterPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const shield = shieldStrength(password);

  const handleNext = () => { if (step < 3) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden stardust"
      style={{ background: "#0B0F19" }}
    >
      {/* Breathing glow blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow" style={{ background: "rgba(236,72,153,0.15)", filter: "blur(120px)" }} />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow" style={{ background: "rgba(59,130,246,0.12)", filter: "blur(120px)", animationDelay: "4s" }} />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logoImg} alt="ISYA" className="mb-3" style={{ width: 100, filter: "drop-shadow(0 0 20px rgba(236,72,153,0.5))" }} />
          <p className="font-mono" style={{ color: "#EC4899", fontSize: "0.7rem", letterSpacing: "0.16em" }}>
            // ENLISTMENT_PORTAL :: SECURE_CHANNEL
          </p>
        </div>

        {/* Rocket trajectory progress */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono transition-all duration-300"
                  style={{
                    background: step >= s.id ? "rgba(236,72,153,0.9)" : "rgba(17,24,39,0.8)",
                    border: `1px solid ${step >= s.id ? "#EC4899" : "rgba(255,255,255,0.1)"}`,
                    color: step >= s.id ? "#fff" : "#9CA3AF",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    boxShadow: step === s.id ? "0 0 16px rgba(236,72,153,0.6)" : "none",
                  }}
                >
                  {step > s.id ? "✓" : s.id}
                </div>
                <span className="font-mono mt-1" style={{ color: step >= s.id ? "#EC4899" : "#9CA3AF", fontSize: "0.55rem", letterSpacing: "0.08em" }}>
                  {s.code}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-2 mb-4 flex items-center gap-0.5">
                  {[0,1,2,3,4].map((d) => (
                    <div key={d} className="w-2 h-px" style={{ background: step > s.id ? "#EC4899" : "rgba(255,255,255,0.12)" }} />
                  ))}
                  <span style={{ color: step > s.id ? "#EC4899" : "rgba(255,255,255,0.2)", fontSize: "0.65rem" }}>→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 hud-corners glass-card"
          style={{ border: "1px solid rgba(236,72,153,0.15)" }}
        >
          <h2 className="text-white mb-1" style={{ fontWeight: 700, fontSize: "1.3rem" }}>
            {STEPS[step - 1].code.replace("_", " ")}
          </h2>
          <p className="font-mono mb-6" style={{ color: "#9CA3AF", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
            STEP {step} OF {STEPS.length} // {STEPS[step - 1].label.toUpperCase()}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Step 1: Identification */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {[{ id: "firstName", label: "FIRST_NAME", ph: "Emma" }, { id: "lastName", label: "LAST_NAME", ph: "Johnson" }].map((f) => (
                    <div key={f.id}>
                      <label className="font-mono block mb-1.5" style={{ color: "#9CA3AF", fontSize: "0.62rem", letterSpacing: "0.1em" }}>{f.label}</label>
                      <input type="text" required placeholder={f.ph} className="w-full px-3 py-2.5 rounded-lg outline-none" style={{ background: "rgba(5,8,15,0.6)", border: "1px solid rgba(236,72,153,0.15)", color: "#fff", fontSize: "0.875rem", transition: "border-color 200ms" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(236,72,153,0.5)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(236,72,153,0.15)"; }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="font-mono block mb-1.5" style={{ color: "#9CA3AF", fontSize: "0.62rem", letterSpacing: "0.1em" }}>EMAIL_ADDRESS</label>
                  <input type="email" required placeholder="cadet@example.com" className="w-full px-3 py-2.5 rounded-lg outline-none" style={{ background: "rgba(5,8,15,0.6)", border: "1px solid rgba(236,72,153,0.15)", color: "#fff", fontSize: "0.875rem" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(236,72,153,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(236,72,153,0.15)"; }}
                  />
                </div>
                <div>
                  <label className="font-mono block mb-1.5" style={{ color: "#9CA3AF", fontSize: "0.62rem", letterSpacing: "0.1em" }}>AGE_GRADE_LEVEL</label>
                  <select required className="w-full px-3 py-2.5 rounded-lg outline-none appearance-none" style={{ background: "rgba(5,8,15,0.6)", border: "1px solid rgba(236,72,153,0.15)", color: "#9CA3AF", fontSize: "0.875rem" }}>
                    <option value="">— SELECT —</option>
                    {["14-15 (Secondary)", "16-17 (Secondary+)", "18-20 (Undergraduate)", "21-24 (Postgraduate)"].map((o) => (
                      <option key={o} value={o} style={{ background: "#0B0F19" }}>{o}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Step 2: Specialization */}
            {step === 2 && (
              <>
                <div>
                  <label className="font-mono block mb-2" style={{ color: "#9CA3AF", fontSize: "0.62rem", letterSpacing: "0.1em" }}>PRIMARY_SPECIALIZATION</label>
                  <div className="grid grid-cols-2 gap-2">
                    {INTERESTS.map((interest) => (
                      <label key={interest} className="flex items-center gap-2 p-2.5 rounded-lg cursor-pointer group glass-card" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                        <input type="radio" name="interest" value={interest} required className="sr-only" />
                        <div className="w-3.5 h-3.5 rounded-full border border-pink-500 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                        </div>
                        <span style={{ color: "#9CA3AF", fontSize: "0.75rem", lineHeight: 1.3 }}>{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Clearance */}
            {step === 3 && (
              <>
                <div>
                  <label className="font-mono block mb-1.5" style={{ color: "#9CA3AF", fontSize: "0.62rem", letterSpacing: "0.1em" }}>SECURITY_PASSPHRASE</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 rounded-lg outline-none"
                      style={{ background: "rgba(5,8,15,0.6)", border: "1px solid rgba(236,72,153,0.15)", color: "#fff", fontSize: "0.875rem" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(236,72,153,0.5)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(236,72,153,0.15)"; }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} aria-label="Toggle password">
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Shield Integrity Meter */}
                  {password.length > 0 && (
                    <div className="mt-3 p-3 rounded-lg" style={{ background: "rgba(5,8,15,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono" style={{ color: "#9CA3AF", fontSize: "0.58rem", letterSpacing: "0.1em" }}>SHIELD_INTEGRITY</span>
                        <span className="font-mono" style={{ color: shield.color, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                          {shield.label}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-300"
                            style={{ background: i < shield.score ? shield.color : "rgba(255,255,255,0.08)" }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Protocol acceptance toggles */}
                <div className="flex flex-col gap-3 mt-1">
                  {[
                    { id: "terms", checked: agreed, onChange: () => setAgreed(!agreed), label: "ACCEPTANCE_OF_PROTOCOL — Terms of Service & Privacy Policy", required: true },
                    { id: "newsletter", checked: newsletter, onChange: () => setNewsletter(!newsletter), label: "SUBSCRIBE_TO_TRANSMISSIONS — ISYA newsletter & updates", required: false },
                  ].map((cb) => (
                    <label key={cb.id} htmlFor={cb.id} className="flex items-start gap-3 cursor-pointer">
                      <div className="relative mt-0.5 shrink-0">
                        <input id={cb.id} type="checkbox" checked={cb.checked} onChange={cb.onChange} required={cb.required} className="sr-only" />
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center transition-all duration-200"
                          style={{
                            background: cb.checked ? "rgba(236,72,153,0.9)" : "rgba(5,8,15,0.7)",
                            border: cb.checked ? "none" : "1px solid rgba(236,72,153,0.3)",
                            boxShadow: cb.checked ? "0 0 12px rgba(236,72,153,0.5)" : "none",
                          }}
                        >
                          {cb.checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                      </div>
                      <span className="font-mono" style={{ color: "#9CA3AF", fontSize: "0.65rem", letterSpacing: "0.06em", lineHeight: 1.6 }}>
                        {cb.label}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-xl btn-press font-mono"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#9CA3AF", fontSize: "0.72rem", letterSpacing: "0.08em" }}
                >
                  ← PREVIOUS_SECTOR
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl btn-press font-mono animate-gradient-shift"
                  style={{
                    background: "linear-gradient(135deg, #EC4899 0%, #F97316 50%, #EC4899 100%)",
                    backgroundSize: "200% auto",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    boxShadow: "0 0 20px rgba(236,72,153,0.35)",
                  }}
                >
                  NEXT_SECTOR →
                  <ChevronRight size={14} className="inline ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !agreed}
                  className="flex-1 py-3 rounded-xl btn-press font-mono"
                  style={{
                    background: loading || !agreed ? "rgba(236,72,153,0.3)" : "linear-gradient(135deg, #EC4899 0%, #F97316 50%, #EC4899 100%)",
                    backgroundSize: "200% auto",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    boxShadow: loading || !agreed ? "none" : "0 0 25px rgba(236,72,153,0.4)",
                    cursor: loading || !agreed ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "PROCESSING_CLEARANCE..." : "CONFIRM_ENLISTMENT ✓"}
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center mt-6 font-mono" style={{ color: "#9CA3AF", fontSize: "0.65rem", letterSpacing: "0.06em" }}>
          Already enlisted?{" "}
          <Link to="/login" style={{ color: "#EC4899", fontWeight: 700 }}>AUTHENTICATE →</Link>
        </p>
      </div>
    </div>
  );
}
