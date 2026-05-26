import React from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, Globe, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { StarfieldCanvas } from "../components/StarfieldCanvas";
import { TextDecode } from "../components/TextDecode";
import { AnimatedCounter } from "../components/AnimatedCounter";
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
    icon: "🛰️",
    label: "EDUCATION",
    title: "Deep Knowledge Transfer",
    description:
      "Access curated workshops, research papers, and mentorship programs from aerospace professionals designed to ignite your scientific curiosity.",
  },
  {
    icon: "🔭",
    label: "COLLABORATION",
    title: "Global Mission Network",
    description:
      "Link up with peers, scientists, and engineers across 60+ nations. Execute coordinated observation campaigns and joint research initiatives.",
  },
  {
    icon: "🚀",
    label: "INNOVATION",
    title: "Launch Real Projects",
    description:
      "Compete in hackathons, secure research grants, and gain access to cutting-edge simulation tools and mentors from ESA, NASA, and JAXA.",
  },
];

const counters = [
  { raw: "8400+", label: "ACTIVE_MEMBERS", display: "8,400+" },
  { raw: "60+",   label: "NATIONS_REPRESENTED", display: "60+" },
  { raw: "150+",  label: "PROJECTS_IN_ORBIT", display: "150+" },
  { raw: "12",    label: "YEARS_OF_IMPACT", display: "12" },
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
  const sectionRef = useScrollReveal();

  return (
    <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="stardust" style={{ background: "#0B0F19" }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden hud-scanline"
        style={{ minHeight: "100vh" }}
      >
        {/* Interactive starfield */}
        <StarfieldCanvas />

        {/* Dim overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(11,15,25,0.3) 0%, rgba(11,15,25,0.82) 100%)",
          }}
        />

        {/* Ambient glow blobs */}
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow"
          style={{ background: "rgba(236,72,153,0.18)", filter: "blur(100px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full pointer-events-none animate-pulse-glow"
          style={{ background: "rgba(59,130,246,0.15)", filter: "blur(110px)", animationDelay: "4s" }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 sm:px-6"
          style={{ minHeight: "100vh", paddingTop: "5rem", paddingBottom: "5rem" }}
        >
          {/* Floating logo */}
          <div className="mb-8 animate-float" style={{ filter: "drop-shadow(0 0 40px rgba(236,72,153,0.5)) drop-shadow(0 0 80px rgba(59,130,246,0.2))" }}>
            <img src={logoImg} alt="ISYA" style={{ width: "clamp(160px, 20vw, 240px)" }} />
          </div>

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-mono"
            style={{
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10B981",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
            }}
          >
            <span className="animate-live-pulse w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            STATUS: ONLINE // ENLISTMENT_OPEN
          </div>

          {/* Decode headline */}
          <h1
            className="text-white mb-5 max-w-4xl"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            <TextDecode
              text="Empowering the Next Generation"
              delay={200}
            />{" "}
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #F97316, #EC4899, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <TextDecode text="of Space Explorers" delay={500} />
            </span>
          </h1>

          <p
            className="mb-10 max-w-xl reveal"
            style={{ color: "#9CA3AF", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", lineHeight: 1.8 }}
          >
            Join 8,400+ young scientists, engineers, and dreamers across 60+ nations — united
            by a shared mission to push the boundaries of space science.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 reveal reveal-delay-1">
            <Link
              to="/register"
              className="group flex items-center gap-3 px-8 py-4 rounded-xl btn-press animate-gradient-shift"
              style={{
                background: "linear-gradient(135deg, #EC4899 0%, #F97316 50%, #EC4899 100%)",
                backgroundSize: "200% auto",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                boxShadow: "0 0 35px rgba(236,72,153,0.45)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(236,72,153,0.7)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 35px rgba(236,72,153,0.45)"; }}
            >
              INITIATE_LAUNCH // JOIN_COMMUNITY
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/media"
              className="flex items-center gap-2 px-8 py-4 rounded-xl btn-press"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.3)",
                color: "#3B82F6",
                fontWeight: 600,
                fontSize: "0.875rem",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.04em",
              }}
            >
              EXPLORE_INITIATIVES →
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35">
            <div className="w-px h-14" style={{ background: "linear-gradient(to bottom, transparent, #EC4899)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#EC4899" }} />
          </div>
        </div>
      </section>

      {/* ── TELEMETRY COUNTERS ── */}
      <section style={{ background: "rgba(5,8,15,0.9)", borderTop: "1px solid rgba(236,72,153,0.12)", borderBottom: "1px solid rgba(236,72,153,0.12)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-center font-mono mb-8" style={{ color: "#9CA3AF", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
            // MISSION_CONTROL :: LIVE_TELEMETRY_FEED
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {counters.map((c) => (
              <div key={c.label} className="text-center">
                <AnimatedCounter
                  target={c.display}
                  className="block"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3rem)",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #EC4899, #F97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                  }}
                />
                <p
                  className="mt-2 font-mono"
                  style={{ color: "#9CA3AF", fontSize: "0.65rem", letterSpacing: "0.14em" }}
                >
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
          <p className="font-mono mb-3" style={{ color: "#EC4899", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
            // MISSION_BRIEFING :: CORE_DIRECTIVES
          </p>
          <h2
            className="text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2 }}
          >
            Three Pillars of the Program
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`p-8 rounded-2xl card-hover hud-corners cursor-default reveal reveal-delay-${i + 1} glass-card`}
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <span
                className="font-mono block mb-2"
                style={{ color: "#EC4899", fontSize: "0.65rem", letterSpacing: "0.14em" }}
              >
                // {p.label}
              </span>
              <h3 className="text-white mb-3" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                {p.title}
              </h3>
              <p style={{ color: "#9CA3AF", lineHeight: 1.75, fontSize: "0.875rem" }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE BANNER ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={ROCKET_IMG}
            alt="Rocket launch"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(11,15,25,0.97) 0%, rgba(11,15,25,0.7) 60%, rgba(11,15,25,0.94) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="max-w-xl reveal">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={15} style={{ color: "#3B82F6" }} />
              <span className="font-mono" style={{ color: "#3B82F6", fontSize: "0.65rem", letterSpacing: "0.14em" }}>
                // GLOBAL_NETWORK :: STATUS_ACTIVE
              </span>
            </div>
            <h2
              className="text-white mb-5"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2 }}
            >
              Launch Your Space Career from Anywhere in the World
            </h2>
            <p style={{ color: "#9CA3AF", lineHeight: 1.8, marginBottom: "2rem" }}>
              Whether you're in Lagos or London, Tokyo or Toronto — ISYA provides the mission
              toolkit, mentorship, and global command network to pursue your passion for space science.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-press animate-gradient-shift"
              style={{
                background: "linear-gradient(135deg, #EC4899 0%, #F97316 50%, #EC4899 100%)",
                backgroundSize: "200% auto",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.8rem",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.06em",
                boxShadow: "0 0 25px rgba(236,72,153,0.35)",
              }}
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
            <p className="font-mono mb-2" style={{ color: "#EC4899", fontSize: "0.65rem", letterSpacing: "0.14em" }}>
              // DATA_ARCHIVES :: RECENT_TRANSMISSIONS
            </p>
            <h2 className="text-white" style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700 }}>
              From the ISYA Blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-1.5 font-mono"
            style={{ color: "#3B82F6", fontSize: "0.7rem", letterSpacing: "0.08em" }}
          >
            VIEW_ALL_RECORDS →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post, i) => (
            <article
              key={post.id}
              className={`rounded-xl overflow-hidden group cursor-pointer card-hover hud-corners reveal reveal-delay-${i + 1} glass-card`}
            >
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                />
                {/* Category tag over image */}
                <div className="absolute top-3 left-3">
                  <span
                    className="font-mono px-2 py-1 rounded"
                    style={{
                      background: `${post.tagColor}22`,
                      color: post.tagColor,
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      border: `1px solid ${post.tagColor}44`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {post.tag}
                  </span>
                </div>
                {/* Data reveal on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: "rgba(5,8,15,0.92)", backdropFilter: "blur(8px)" }}
                >
                  <p className="font-mono" style={{ color: "#EC4899", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                    // SECTOR_READ_TIME: {post.readTime} | AUTH_LEVEL: PUBLIC
                  </p>
                </div>
              </div>
              <div className="p-5">
                <h3
                  className="text-white mb-3"
                  style={{ fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                >
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 font-mono" style={{ color: "#9CA3AF", fontSize: "0.62rem", letterSpacing: "0.08em" }}>
                  <span>{post.date}</span>
                  <span>|</span>
                  <span>{post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div
          className="rounded-2xl p-12 md:p-16 text-center relative overflow-hidden hud-corners reveal glass-card"
        >
          <div
            className="absolute top-0 left-1/3 w-72 h-72 rounded-full pointer-events-none animate-pulse-glow"
            style={{ background: "rgba(236,72,153,0.15)", filter: "blur(80px)", transform: "translateY(-50%)" }}
          />
          <div
            className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full pointer-events-none animate-pulse-glow"
            style={{ background: "rgba(59,130,246,0.12)", filter: "blur(80px)", transform: "translateY(50%)", animationDelay: "4s" }}
          />
          <div className="relative z-10">
            <img src={logoImg} alt="ISYA" className="mx-auto mb-6" style={{ width: 80, filter: "drop-shadow(0 0 18px rgba(236,72,153,0.6))" }} />
            <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2 }}>
              Ready to Reach for the Stars?
            </h2>
            <p style={{ color: "#9CA3AF", maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.8 }}>
              Join thousands of young space cadets and take your first step toward an extraordinary
              career in space science.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl btn-press animate-gradient-shift font-mono"
                style={{
                  background: "linear-gradient(135deg, #EC4899 0%, #F97316 50%, #EC4899 100%)",
                  backgroundSize: "200% auto",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  boxShadow: "0 0 30px rgba(236,72,153,0.35)",
                }}
              >
                ENLIST_NOW // FREE_ACCESS
                <ArrowRight size={17} />
              </Link>
              <Link to="/blog" className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-mono"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#9CA3AF", fontSize: "0.78rem", letterSpacing: "0.04em" }}>
                READ_TRANSMISSIONS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
