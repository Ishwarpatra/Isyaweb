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
  { raw: 8400, label: "ACTIVE_MEMBERS", display: "8,400+" },
  { raw: 60,   label: "NATIONS_REPRESENTED", display: "60+" },
  { raw: 150,  label: "PROJECTS_IN_ORBIT", display: "150+" },
  { raw: 12,    label: "YEARS_OF_IMPACT", display: "12" },
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

  return (
    <div ref={sectionRef} className="stardust bg-[#0B0F19]">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden hud-scanline min-h-screen flex items-center">
        <StarfieldCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(11,15,25,0.3)_0%,rgba(11,15,25,0.82)_100%)]" />
        
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow bg-pink-500/15 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full pointer-events-none animate-pulse-glow bg-blue-500/15 blur-[110px] [animation-delay:4s]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center">
          <div className="mb-8 animate-float drop-shadow-[0_0_40px_rgba(236,72,153,0.5)]">
            <img src={logoImg} alt="ISYA Logo" width="200" height="200" className="w-[clamp(160px,20vw,240px)]" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-mono text-xs tracking-[0.12em] bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
            <span className="animate-live-pulse w-1.5 h-1.5 rounded-full bg-emerald-400" />
            STATUS: ONLINE // ENLISTMENT_OPEN
          </div>

          <h1 className="text-white mb-5 max-w-4xl text-[clamp(2.2rem,5.5vw,3.8rem)] font-extrabold leading-[1.1] tracking-tight">
            <span className="sr-only">Empowering the Next Generation of Space Explorers</span>
            <span aria-hidden="true">
              <TextDecode text="Empowering the Next Generation" delay={200} />
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                <TextDecode text="of Space Explorers" delay={500} />
              </span>
            </span>
          </h1>

          <p className="mb-10 max-w-xl text-gray-400 text-[clamp(0.95rem,1.8vw,1.1rem)] leading-relaxed reveal">
            Join 8,400+ young scientists, engineers, and dreamers across 60+ nations — united
            by a shared mission to push the boundaries of space science.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 reveal reveal-delay-1">
            <Link
              to="/register"
              aria-label="Join Community"
              className="group flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-[0.85rem] font-bold tracking-wider text-white shadow-[0_0_35px_rgba(236,72,153,0.45)] bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-[length:200%_auto] animate-gradient-shift hover:shadow-[0_0_50px_rgba(236,72,153,0.7)] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
            >
              INITIATE_LAUNCH // JOIN_COMMUNITY
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/media"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-mono text-sm font-semibold tracking-wide text-blue-500 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              EXPLORE_INITIATIVES →
            </Link>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" aria-hidden="true">
            <div className="w-px h-14 bg-gradient-to-b from-transparent to-pink-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
          </div>
        </div>
      </section>

      {/* ── TELEMETRY COUNTERS ── */}
      <section className="bg-[#05080F]/90 border-y border-pink-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-center font-mono text-gray-500 text-sm tracking-[0.18em] mb-8">
            // MISSION_CONTROL :: LIVE_TELEMETRY_FEED
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {counters.map((c) => (
              <div key={c.label} className="text-center">
                <AnimatedCounter
                  target={c.raw}
                  className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-none bg-gradient-to-br from-pink-500 to-orange-500 bg-clip-text text-transparent"
                />
                <p className="mt-2 font-mono text-gray-500 text-xs tracking-[0.14em]">
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
          <p className="font-mono text-pink-500 text-[0.68rem] tracking-[0.18em] mb-3">
            // MISSION_BRIEFING :: CORE_DIRECTIVES
          </p>
          <h2 className="text-white text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight">
            Three Pillars of the Program
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`p-8 rounded-2xl glass-card hud-corners reveal reveal-delay-${i + 1}`}
            >
              <div className="text-4xl mb-4" role="img" aria-label={p.label}>{p.icon}</div>
              <span className="font-mono block text-pink-500 text-xs tracking-[0.14em] mb-2">
                // {p.label}
              </span>
              <h3 className="text-white text-xl font-bold mb-3">
                {p.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE BANNER ── */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={ROCKET_IMG}
            alt="Rocket launch background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/95 via-[#0B0F19]/70 to-[#0B0F19]/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl reveal">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={15} className="text-blue-500" />
              <span className="font-mono text-blue-500 text-xs tracking-[0.14em]">
                // GLOBAL_NETWORK :: STATUS_ACTIVE
              </span>
            </div>
            <h2 className="text-white text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight mb-5">
              Launch Your Space Career from Anywhere in the World
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you're in Lagos or London, Tokyo or Toronto — ISYA provides the mission
              toolkit, mentorship, and global command network to pursue your passion for space science.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest text-white shadow-[0_0_25px_rgba(236,72,153,0.35)] bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-[length:200%_auto] animate-gradient-shift"
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
            <p className="font-mono text-pink-500 text-xs tracking-[0.14em] mb-2">
              // DATA_ARCHIVES :: RECENT_TRANSMISSIONS
            </p>
            <h2 className="text-white text-[clamp(1.6rem,3vw,2rem)] font-bold">
              From the ISYA Blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-1.5 font-mono text-blue-500 text-[0.7rem] tracking-wider hover:text-blue-400 transition-colors"
          >
            VIEW_ALL_RECORDS
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className={`group flex flex-col rounded-2xl overflow-hidden glass-card reveal reveal-delay-${i + 1}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md font-mono text-[0.6rem] font-bold tracking-wider text-white" style={{ background: post.tagColor }}>
                  {post.tag}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3 font-mono text-[0.6rem] text-gray-500 tracking-wider">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>BY_{post.author}</span>
                </div>
                <h3 className="text-white font-bold leading-snug mb-4 group-hover:text-pink-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-mono text-[0.6rem] text-gray-500">{post.readTime}_READ</span>
                  <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
