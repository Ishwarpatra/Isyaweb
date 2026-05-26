import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, Globe, ChevronRight, Satellite, Telescope, Rocket } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { toast } from "sonner";
import { StarfieldCanvas } from "../components/StarfieldCanvas";
import { TextDecode } from "../components/TextDecode";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { lockScroll, unlockScroll } from "../hooks/useScrollLock";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";

const ROCKET_IMG =
  "https://images.unsplash.com/photo-1517976487492-5750f3195933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2glMjBzcGFjZSUyMGV4cGxvcmF0aW9ufGVufDF8fHx8MTc3OTEyMTE2MHww&ixlib=rb-4.1.0&q=80&w=1080";
const OBS_IMG =
  "https://images.unsplash.com/photo-1727034394040-0377258a5791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlc2NvcGUlMjBvYnNlcnZhdG9yeSUyMG5pZ2h0JTIwc2t5JTIwc3RhcnN8ZW58MXx8fHwxNzc5MTIxMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const NEBULA_IMG =
  "https://images.unsplash.com/photo-1706562018605-909733434781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const GALAXY_IMG =
  "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const pillars = [
  {
    icon: Satellite,
    label: "EDUCATION",
    title: "Deep Knowledge Transfer",
    description:
      "Access curated workshops, research papers, and mentorship programs from aerospace professionals designed to ignite your scientific curiosity.",
  },
  {
    icon: Telescope,
    label: "COLLABORATION",
    title: "Global Mission Network",
    description:
      "Link up with peers, scientists, and engineers across 60+ nations. Execute coordinated observation campaigns and joint research initiatives.",
  },
  {
    icon: Rocket,
    label: "INNOVATION",
    title: "Launch Real Projects",
    description:
      "Compete in hackathons, secure research grants, and gain access to cutting-edge simulation tools and mentors from ESA, NASA, and JAXA.",
  },
];

const counters = [
  { raw: 8400, label: "ACTIVE_MEMBERS", suffix: "+" },
  { raw: 60,   label: "NATIONS_REPRESENTED", suffix: "+" },
  { raw: 150,  label: "PROJECTS_IN_ORBIT", suffix: "+" },
  { raw: 12,    label: "YEARS_OF_IMPACT", suffix: "" },
];

const latestPosts = [
  {
    id: 1,
    tag: "MISSION_UPDATE",
    tagColor: "#F97316",
    title: "ISYA Members Join ESA's Young Graduate Traineeship Program",
    date: "2026-05-14",
    author: "CADET_CHEN_S",
    image: OBS_IMG,
    readTime: "4 MIN",
  },
  {
    id: 2,
    tag: "RESEARCH",
    tagColor: "#3B82F6",
    title: "Exoplanet Discovery Methods: A Youth Astronomer's Guide",
    date: "2026-05-10",
    author: "CADET_OSEI_D",
    image: NEBULA_IMG,
    readTime: "8 MIN",
  },
  {
    id: 3,
    tag: "EVENT",
    tagColor: "#EC4899",
    title: "Annual Space Symposium 2026 — Registration Now Open",
    date: "2026-05-06",
    author: "ISYA_COMMAND",
    image: GALAXY_IMG,
    readTime: "3 MIN",
  },
];

export function LandingPage() {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [posts, setPosts] = useState<typeof latestPosts>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Show onboarding walkthrough to logged-in users who haven't completed it yet
    const userSession = sessionStorage.getItem("isya_user");
    const onboardingDone = localStorage.getItem("isya_onboarding_done");
    if (userSession && !onboardingDone) {
      setOnboardingStep(1);
    }
  }, []);

  const fetchTransmissions = () => {
    setLoading(true);
    setError(null);
    setIsRetrying(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        setPosts(latestPosts);
        setError(null);
      } catch (err: any) {
        setError("ERR_DATALINK_TIMEOUT: The ground station telemetry buffer has timing desync.");
      } finally {
        setLoading(false);
        setIsRetrying(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchTransmissions();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="stardust bg-dark">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden hud-scanline min-h-screen flex items-center">
        <StarfieldCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(11,15,25,0.3)_0%,rgba(11,15,25,0.82)_100%)]" />
        
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow bg-secondary/15 blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow bg-accent/10 blur-[120px] [animation-delay:4s]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center">
          <div className="mb-8 animate-float drop-shadow-[0_0_40px_rgba(236,72,153,0.5)]">
            <img src={logoImg} alt="ISYA Logo" width="200" height="200" className="w-40 md:w-56 lg:w-60" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-mono text-xs tracking-[0.12em] bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
            <span className="animate-[pulse_1.5s_ease-in-out_2] w-1.5 h-1.5 rounded-full bg-emerald-400" />
            STATUS: ONLINE // ENLISTMENT_OPEN
          </div>

          <h1 className="text-white mb-5 max-w-4xl text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            <span className="sr-only">Empowering the Next Generation of Space Explorers</span>
            <span aria-hidden="true">
              <TextDecode text="Empowering the Next Generation" delay={200} />
              <br />
              <TextDecode 
                text="of Space Explorers" 
                delay={500} 
                className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block"
              />
            </span>
          </h1>

          <p className="mb-10 max-w-xl text-gray-400 text-base md:text-lg leading-relaxed reveal">
            Join 8,400+ young scientists, engineers, and dreamers across 60+ nations — united
            by a shared mission to push the boundaries of space science.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 reveal reveal-delay-1">
            <Link
              to="/register"
              className="group flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-[0.85rem] font-bold tracking-wider text-white shadow-[0_0_35px_rgba(236,72,153,0.45)] bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-shift hover:shadow-[0_0_50px_rgba(236,72,153,0.7)] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary"
            >
              INITIATE_LAUNCH // JOIN_COMMUNITY
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/media#initiatives"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-mono text-sm font-semibold tracking-wide text-accent bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              EXPLORE_INITIATIVES →
            </Link>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" aria-hidden="true">
            <div className="w-px h-14 bg-gradient-to-b from-transparent to-secondary" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
          </div>
        </div>
      </section>

      {/* ── TELEMETRY COUNTERS ── */}
      <section className="bg-dark-secondary/90 border-y border-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-center font-mono text-gray-400 text-sm tracking-[0.18em] mb-8">
            // MISSION_CONTROL :: LIVE_TELEMETRY_FEED
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {counters.map((c) => (
              <div key={c.label} className="text-center">
                <AnimatedCounter
                  target={c.raw}
                  suffix={c.suffix}
                  className="text-3xl md:text-5xl font-extrabold leading-none bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent"
                />
                <p className="mt-2 font-mono text-gray-400 text-xs tracking-[0.14em]">
                  [{c.label}]
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16 reveal">
          <p className="font-mono text-secondary text-xs tracking-[0.18em] mb-3">
            // MISSION_BRIEFING :: CORE_DIRECTIVES
          </p>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Three Pillars of the Program
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.title}
                className={`p-8 rounded-2xl glass-card hud-corners reveal reveal-delay-${i + 1}`}
              >
                <div className="mb-4 text-secondary">
                  <IconComponent size={32} className="drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]" />
                </div>
                <span className="font-mono block text-secondary text-xs tracking-[0.14em] mb-2">
                  // {p.label}
                </span>
                <h3 className="text-white text-xl font-bold mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FEATURE BANNER ── */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={ROCKET_IMG}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/70 to-dark/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl reveal">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={15} className="text-accent" />
              <span className="font-mono text-accent text-xs tracking-[0.14em]">
                // GLOBAL_NETWORK :: STATUS_ACTIVE
              </span>
            </div>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-5">
              Launch Your Space Career from Anywhere in the World
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you're in Lagos or London, Tokyo or Toronto — ISYA provides the mission
              toolkit, mentorship, and global command network to pursue your passion for space science.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest text-white shadow-glow-pink bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-shift"
            >
              BEGIN_MISSION
              <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── LATEST TRANSMISSIONS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-12 reveal">
          <div>
            <p className="font-mono text-secondary text-xs tracking-[0.14em] mb-2">
              // DATA_ARCHIVES :: RECENT_TRANSMISSIONS
            </p>
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
              From the ISYA Blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-1.5 font-mono text-accent text-[0.7rem] tracking-wider hover:text-accent/80 transition-colors"
          >
            VIEW_ALL_RECORDS
            <ArrowRight size={14} />
          </Link>
        </div>

        <div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex flex-col rounded-2xl overflow-hidden glass-card border border-white/5 animate-pulse">
                  <div className="relative aspect-[16/10] bg-white/5">
                    <div className="absolute top-4 left-4 w-16 h-5 bg-white/10 rounded-md" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-3 bg-white/5 rounded w-20" />
                      <div className="w-1 h-1 rounded-full bg-white/5" />
                      <div className="h-3 bg-white/5 rounded w-16" />
                    </div>
                    <div className="h-5 bg-white/10 rounded w-full mb-2" />
                    <div className="h-5 bg-white/10 rounded w-4/5 mb-4" />
                    <div className="mt-auto flex items-center justify-between">
                      <div className="h-3 bg-white/5 rounded w-12" />
                      <div className="h-4 bg-white/5 rounded w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 text-center max-w-xl mx-auto">
              <p className="font-mono text-red-500 text-xs mb-3">// ERR_TRANSMISSION_FAILURE</p>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{error}</p>
              <button
                onClick={fetchTransmissions}
                disabled={isRetrying}
                className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-red-500/20 border border-red-500/40 hover:bg-red-500/35 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRetrying ? "REESTABLISHING_LINK..." : "RETRY_CONNECTION_BUFFER"}
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] text-center max-w-xl mx-auto">
              <p className="font-mono text-gray-400 text-xs mb-2">// BUFFER_EMPTY</p>
              <p className="text-gray-400 text-sm">No telemetry transmissions currently logged in this sector.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className={`group flex flex-col rounded-2xl overflow-hidden glass-card reveal reveal-delay-${i + 1}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus-within:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider text-white" style={{ background: post.tagColor }}>
                      {post.tag}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3 font-mono text-xs text-gray-400 tracking-wider">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-700" />
                      <span>BY_{post.author}</span>
                    </div>
                    <h3 className="text-white font-bold leading-snug mb-4 group-hover:text-secondary group-focus-within:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-400">{post.readTime}_READ</span>
                      <span className="text-accent group-hover:translate-x-1 group-focus-within:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Immersive Walkthrough Onboarding Modal */}
      <OnboardingModalWrapper 
        onboardingStep={onboardingStep} 
        setOnboardingStep={setOnboardingStep} 
      />
    </div>
  );
}

// Separate component for onboarding modal to cleanly isolate focus and scroll state triggers
interface OnboardingModalWrapperProps {
  onboardingStep: number | null;
  setOnboardingStep: (step: number | null) => void;
}

function OnboardingModalWrapper({ onboardingStep, setOnboardingStep }: OnboardingModalWrapperProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastActiveElementOnboarding = useRef<HTMLElement | null>(null);

  // 1. Scroll locking effect
  useEffect(() => {
    if (onboardingStep !== null) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [onboardingStep]);

  // 2. Focus trap and Escape key listener effect
  useEffect(() => {
    if (onboardingStep === null) {
      if (lastActiveElementOnboarding.current) {
        lastActiveElementOnboarding.current.focus();
        lastActiveElementOnboarding.current = null;
      }
      return;
    }

    lastActiveElementOnboarding.current = document.activeElement as HTMLElement;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = modal.querySelectorAll<HTMLElement>(focusableSelector);

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Skip walkthrough on Escape
        localStorage.setItem("isya_onboarding_done", "true");
        setOnboardingStep(null);
        toast.success("Walkthrough skipped. Terminals ready.");
        return;
      }

      if (e.key === "Tab") {
        const elements = modal.querySelectorAll<HTMLElement>(focusableSelector);
        if (elements.length === 0) return;

        const firstEl = elements[0];
        const lastEl = elements[elements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onboardingStep, setOnboardingStep]);

  if (onboardingStep === null) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Cadet Onboarding Walkthrough"
    >
      <div 
        ref={modalRef} 
        className="relative w-full max-w-md bg-dark/95 border border-secondary/20 rounded-2xl p-6 shadow-glow-pink text-left space-y-6"
      >
        {/* HUD Cutout corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-secondary rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-secondary rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-secondary rounded-br-lg" />

        <div className="space-y-2">
          <span className="font-mono text-[10px] text-secondary tracking-wider">
            CADET_ONBOARDING // STAGE_0{onboardingStep}_OF_03
          </span>
          <h3 className="text-white text-lg font-bold">
            {onboardingStep === 1 && "Sector Home (Command Center)"}
            {onboardingStep === 2 && "Data Archives & Observatories"}
            {onboardingStep === 3 && "Secure Control Terminals"}
          </h3>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">
          {onboardingStep === 1 && "Welcome, Cadet! You have successfully established a datalink with the ISYA network. This Home Sector is your central command center, housing live telemetry, mission directives, and transmission logs."}
          {onboardingStep === 2 && "Access the Blog and Media sectors to explore research articles, view video briefings of symposiums, or tune into podcast transmissions hosted by aerospace specialists and fellow crew members."}
          {onboardingStep === 3 && "As you gain clearances, navigate to the Admin Sector where you can manage telemetry gauges, review pending registration files, and decrypt signal stream log vectors."}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <button 
            onClick={() => {
              localStorage.setItem("isya_onboarding_done", "true");
              setOnboardingStep(null);
              toast.success("Walkthrough skipped. Terminals ready.");
            }}
            className="text-xs font-mono text-gray-400 hover:text-gray-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary"
          >
            SKIP_WALKTHROUGH
          </button>

          <div className="flex gap-2">
            {onboardingStep > 1 && (
              <button 
                onClick={() => setOnboardingStep(onboardingStep - 1)}
                className="px-3 py-1.5 rounded-lg font-mono text-[10px] text-gray-400 border border-white/10 hover:bg-white/5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary"
              >
                PREV
              </button>
            )}
            <button 
              onClick={() => {
                if (onboardingStep < 3) {
                  setOnboardingStep(onboardingStep + 1);
                } else {
                  localStorage.setItem("isya_onboarding_done", "true");
                  setOnboardingStep(null);
                  toast.success("Cadet onboarding synchronized! Welcome to ISYA.");
                }
              }}
              className="px-4 py-1.5 rounded-lg font-mono text-[10px] text-white bg-secondary hover:bg-secondary/90 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary"
            >
              {onboardingStep === 3 ? "SYNCHRONIZE" : "NEXT_SECTOR"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
