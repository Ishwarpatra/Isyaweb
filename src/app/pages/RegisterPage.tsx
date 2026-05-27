import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ChevronRight, ShieldCheck, AlertCircle } from "lucide-react";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";

const INTERESTS = [
  "Astrophysics", 
  "Robotics / Engineering", 
  "Space Communications", 
  "Astrobiology", 
  "Data Science & AI", 
  "Aerospace Design", 
  "Space Policy", 
  "Science Communication"
];

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
    { label: "CRITICAL", color: "text-red-500 bg-red-500" },
    { label: "WEAK", color: "text-orange-500 bg-orange-500" },
    { label: "NOMINAL", color: "text-yellow-500 bg-yellow-500" },
    { label: "STRONG", color: "text-emerald-500 bg-emerald-500" },
    { label: "MAXIMUM", color: "text-blue-500 bg-blue-500" },
  ];
  return { score, ...levels[Math.min(score, 4)] };
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Form input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [interest, setInterest] = useState("");
  const [password, setPassword] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shield = shieldStrength(password);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!firstName.trim()) newErrors.firstName = "First name is required";
      if (!lastName.trim()) newErrors.lastName = "Last name is required";
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(email)) {
        newErrors.email = "Please enter valid email coordinates";
      }
      
      if (!age) newErrors.age = "Please select your age grade level";
    }

    if (currentStep === 2) {
      if (!interest) {
        newErrors.interest = "Please select a primary specialization";
        toast.error("Please select a mission role to continue.");
      }
    }

    if (currentStep === 3) {
      if (password.length < 8) {
        newErrors.password = "Security passphrase must be at least 8 characters";
      }
      if (!agreed) {
        newErrors.agreed = "You must accept the enlistment protocol";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) setStep(step + 1);
    } else {
      toast.error("Please resolve validation errors before proceeding.");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      toast.error("Passphrase is weak or protocols are not accepted.");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, `${firstName} ${lastName}`);
      setLoading(false);
      toast.success("Enlistment successful! Welcome to the ISYA network.");
      navigate("/");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#0B0F19] stardust">
      {/* Breathing glow blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow bg-pink-500/15 blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow bg-blue-500/10 blur-[120px] [animation-delay:4s]" />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img 
            src={logoImg} 
            alt="ISYA Logo" 
            width="100"
            height="100"
            className="w-[100px] mb-4 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] animate-float mix-blend-multiply" 
          />
          <p className="font-mono text-pink-500 text-xs tracking-[0.2em]">
            // ENLISTMENT_PORTAL :: SECURE_CHANNEL
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-center mb-10" aria-label="Registration Progress">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all border ${
                    step >= s.id 
                      ? "bg-pink-500 text-white border-pink-500 shadow-[0_0_16px_rgba(236,72,153,0.4)]" 
                      : "bg-gray-900/80 text-gray-600 border-white/10"
                  }`}
                >
                  {step > s.id ? "✓" : s.id}
                </div>
                <span className={`font-mono text-xs tracking-widest mt-2 ${step >= s.id ? "text-pink-500" : "text-gray-500"}`}>
                  {s.code}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-4 mb-6 flex items-center gap-1">
                  {[1, 2, 3].map((dot) => (
                    <div 
                      key={dot} 
                      className={`w-1.5 h-1.5 rounded-full ${step > s.id ? "bg-pink-500" : "bg-white/5"}`} 
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="rounded-2xl p-8 bg-gray-900/70 backdrop-blur-2xl border border-pink-500/15 shadow-2xl relative hud-corners">
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold tracking-tight mb-1">
              {STEPS[step - 1].code.replace("_", " ")}
            </h2>
            <p className="font-mono text-gray-500 text-xs tracking-widest">
              STEP {step} OF {STEPS.length} // {STEPS[step - 1].label.toUpperCase()}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Step 1: Identification */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block font-mono text-xs text-gray-400 tracking-widest mb-2">FIRST_NAME</label>
                    <input 
                      id="firstName"
                      type="text" 
                      required 
                      autoComplete="given-name"
                      placeholder="Emma" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`w-full bg-gray-950/60 border rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors ${
                        errors.firstName ? "border-red-500 focus:border-red-500" : "border-pink-500/10 focus:border-pink-500/50"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-red-400">
                        <AlertCircle size={12} />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block font-mono text-xs text-gray-400 tracking-widest mb-2">LAST_NAME</label>
                    <input 
                      id="lastName"
                      type="text" 
                      required 
                      autoComplete="family-name"
                      placeholder="Johnson" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`w-full bg-gray-950/60 border rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors ${
                        errors.lastName ? "border-red-500 focus:border-red-500" : "border-pink-500/10 focus:border-pink-500/50"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-red-400">
                        <AlertCircle size={12} />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-gray-400 tracking-widest mb-2">EMAIL_ADDRESS</label>
                  <input 
                    id="email"
                    type="email" 
                    required 
                    autoComplete="email"
                    placeholder="cadet@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-gray-950/60 border rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-pink-500/10 focus:border-pink-500/50"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-red-400">
                      <AlertCircle size={12} />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="age" className="block font-mono text-xs text-gray-400 tracking-widest mb-2">AGE_GRADE_LEVEL</label>
                  <div className="relative">
                    <select 
                      id="age"
                      required 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={`w-full bg-gray-950/60 border rounded-lg px-4 py-3 text-gray-400 text-sm outline-none appearance-none cursor-pointer ${
                        errors.age ? "border-red-500 focus:border-red-500" : "border-pink-500/10 focus:border-pink-500/50"
                      }`}
                    >
                      <option value="">— SELECT —</option>
                      <option value="14-15">14-15 (Secondary)</option>
                      <option value="16-17">16-17 (Secondary+)</option>
                      <option value="18-20">18-20 (Undergraduate)</option>
                      <option value="21-24">21-24 (Postgraduate)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                      <ChevronRight size={16} className="rotate-90" />
                    </div>
                  </div>
                  {errors.age && (
                    <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-red-400">
                      <AlertCircle size={12} />
                      {errors.age}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Specialization */}
            {step === 2 && (
              <div>
                <label className="block font-mono text-xs text-gray-400 tracking-widest mb-4">PRIMARY_SPECIALIZATION</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INTERESTS.map((intOption) => (
                    <label 
                      key={intOption} 
                      className={`relative flex items-center gap-3 p-4 rounded-xl bg-white/5 border hover:border-pink-500/20 cursor-pointer transition-all group ${
                        interest === intOption ? "bg-pink-500/5 border-pink-500/30" : "border-white/5"
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="interest" 
                        value={intOption} 
                        checked={interest === intOption}
                        onChange={() => setInterest(intOption)}
                        required 
                        className="sr-only" 
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        interest === intOption ? "border-pink-500" : "border-pink-500/50"
                      }`}>
                        <div className={`w-2 h-2 rounded-full bg-pink-500 transition-opacity ${
                          interest === intOption ? "opacity-100" : "opacity-0"
                        }`} />
                      </div>
                      <span className={`text-xs transition-colors ${
                        interest === intOption ? "text-white font-semibold" : "text-gray-400"
                      }`}>{intOption}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Clearance */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="password" className="block font-mono text-xs text-gray-400 tracking-widest mb-2">SECURITY_PASSPHRASE</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full bg-gray-950/60 border rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors pr-10 ${
                        errors.password ? "border-red-500 focus:border-red-500" : "border-pink-500/10 focus:border-pink-500/50"
                      }`}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-red-400">
                      <AlertCircle size={12} />
                      {errors.password}
                    </p>
                  )}

                  {password.length > 0 && (
                    <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-gray-500 tracking-widest">SHIELD_INTEGRITY</span>
                        <span className={`font-mono text-xs font-bold tracking-widest ${shield.color.split(" ")[0]}`}>
                          {shield.label}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div 
                            key={i} 
                            className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                              i < shield.score ? shield.color.split(" ")[1] : "bg-white/5"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input 
                        type="checkbox" 
                        checked={agreed} 
                        onChange={() => setAgreed(!agreed)} 
                        required 
                        className="sr-only" 
                      />
                      <div className={`w-5 h-5 rounded border transition-all ${
                        agreed ? "bg-pink-500 border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.5)]" : "bg-gray-950/60 border-white/10 group-hover:border-pink-500/50"
                      } flex items-center justify-center`}>
                        {agreed && <ShieldCheck size={14} className="text-white" />}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-gray-400 leading-relaxed tracking-wider">
                      ACCEPTANCE_OF_PROTOCOL — <Link to="/guidelines#terms" className="text-pink-500 hover:underline">Terms of Service</Link> & <Link to="/guidelines#privacy" className="text-pink-500 hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.agreed && (
                    <p className="flex items-center gap-1 font-mono text-[11px] text-red-400">
                      <AlertCircle size={12} />
                      {errors.agreed}
                    </p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input 
                        type="checkbox" 
                        checked={newsletter} 
                        onChange={() => setNewsletter(!newsletter)} 
                        className="sr-only" 
                      />
                      <div className={`w-5 h-5 rounded border transition-all ${
                        newsletter ? "bg-pink-500 border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.5)]" : "bg-gray-950/60 border-white/10 group-hover:border-pink-500/50"
                      } flex items-center justify-center`}>
                        {newsletter && <ShieldCheck size={14} className="text-white" />}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-gray-400 leading-relaxed tracking-wider">
                      SUBSCRIBE_TO_TRANSMISSIONS — ISYA newsletter & updates
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                >
                  ← PREVIOUS_SECTOR
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest text-white bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  NEXT_SECTOR
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !agreed}
                  className={`flex-1 py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest text-white transition-all cursor-pointer ${
                    loading || !agreed 
                      ? "bg-pink-500/30 cursor-not-allowed" 
                      : "bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-0.5"
                  }`}
                >
                  {loading ? "PROCESSING..." : "FINALIZE_ENLISTMENT // JOIN"}
                </button>
              )}
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <p className="font-mono text-gray-500 text-xs">ALREADY_ENLISTED?</p>
            <Link to="/login" className="font-mono text-xs font-bold text-pink-500 tracking-widest hover:text-pink-400 transition-colors">
              ACCESS_TERMINAL →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
