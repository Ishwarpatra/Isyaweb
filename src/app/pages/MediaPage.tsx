import { useState } from "react";
import { Play, Pause, Clock, Headphones, Youtube, ExternalLink, Radio } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const OBS1 = "https://images.unsplash.com/photo-1727034394040-0377258a5791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlc2NvcGUlMjBvYnNlcnZhdG9yeSUyMG5pZ2h0JTIwc2t5JTIwc3RhcnN8ZW58MXx8fHwxNzc5MTIxMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const NEBULA = "https://images.unsplash.com/photo-1706562018605-909733434781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const GALAXY = "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const MILKY = "https://images.unsplash.com/photo-1476156863127-a8f1e9dba2b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const ROCKET = "https://images.unsplash.com/photo-1517976487492-5750f3195933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2glMjBzcGFjZSUyMGV4cGxvcmF0aW9ufGVufDF8fHx8MTc3OTEyMTE2MHww&ixlib=rb-4.1.0&q=80&w=1080";
const OBS2 = "https://images.unsplash.com/photo-1727034393564-dc7b0275686d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZWxlc2NvcGUlMjBvYnNlcnZhdG9yeSUyMG5pZ2h0JTIwc2t5JTIwc3RhcnN8ZW58MXx8fHwxNzc5MTIxMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080";

const VIDEOS = [
  { id: 1, title: "ISYA 2026 Symposium Opening Ceremony", duration: "18:42", views: "12.4K", image: OBS1, youtubeId: "dQw4w9WgXcQ", isLive: true },
  { id: 2, title: "Introduction to Gravitational Wave Astronomy", duration: "34:15", views: "9.8K", image: NEBULA, youtubeId: "dQw4w9WgXcQ", isLive: false },
  { id: 3, title: "How to Build a CubeSat — Student Guide", duration: "45:30", views: "22.1K", image: GALAXY, youtubeId: "dQw4w9WgXcQ", isLive: false },
  { id: 4, title: "Live Q&A with an ESA Mission Specialist", duration: "58:00", views: "7.6K", image: MILKY, youtubeId: "dQw4w9WgXcQ", isLive: false },
  { id: 5, title: "Radio Telescope Assembly Workshop", duration: "27:44", views: "15.3K", image: ROCKET, youtubeId: "dQw4w9WgXcQ", isLive: false },
  { id: 6, title: "ISYA Member Showcase: Best Projects of 2025", duration: "41:10", views: "18.9K", image: OBS2, youtubeId: "dQw4w9WgXcQ", isLive: false },
];

const PODCASTS = [
  { id: 1, title: "The Next Space Race: Youth Perspectives", episode: "EP_042", guest: "DR_AMARA_OSEI", duration: "58:24", date: "2026-05-12", freq: "98.6 MHz" },
  { id: 2, title: "From Classroom to Control Room", episode: "EP_041", guest: "CARLOS_MENDEZ", duration: "44:11", date: "2026-05-05", freq: "98.6 MHz" },
  { id: 3, title: "Women Who Are Changing Space Science", episode: "EP_040", guest: "DR_YUKI_NAKAMURA", duration: "51:37", date: "2026-04-28", freq: "98.6 MHz" },
  { id: 4, title: "Astrobiology & the Search for Life", episode: "EP_039", guest: "PROF_LIAM_OBRIEN", duration: "62:08", date: "2026-04-21", freq: "98.6 MHz" },
  { id: 5, title: "Space Policy Explained for Young Scientists", episode: "EP_038", guest: "FATIMA_AL-RASHID", duration: "39:55", date: "2026-04-14", freq: "98.6 MHz" },
];

const INITIATIVES = [
  { id: 1, icon: "🛰️", title: "CubeSat Challenge", code: "INIT_CUBESAT", description: "Design and launch a student-built satellite with the support of ESA mentors.", participants: 124, status: "ACTIVE" },
  { id: 2, icon: "🔭", title: "Global Telescope Network", code: "INIT_GTN", description: "Connect with observatories worldwide and conduct coordinated observation campaigns.", participants: 340, status: "ACTIVE" },
  { id: 3, icon: "🧬", title: "Mars Habitat Design", code: "INIT_MARSHABITAT", description: "Engineer life-support systems for future Martian outposts in a global competition.", participants: 88, status: "ENROLLING" },
  { id: 4, icon: "📡", title: "Space Data Hackathon", code: "INIT_HACKATHON", description: "Analyze real mission data and compete for prizes from leading space agencies.", participants: 215, status: "UPCOMING" },
];

const EQ_BAR_DELAYS = [0, 0.15, 0.3, 0.1, 0.25, 0.05, 0.2];

function EQBars({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-0.5" style={{ height: 20 }}>
      {EQ_BAR_DELAYS.map((delay, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: active ? undefined : 4,
            background: "#EC4899",
            borderRadius: 2,
            animation: active ? `eq-bar 0.6s ease-in-out ${delay}s infinite alternate` : "none",
            minHeight: 4,
            maxHeight: 20,
          }}
        />
      ))}
    </div>
  );
}

function LiveBeacon() {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        background: "rgba(16,185,129,0.1)",
        border: "1px solid rgba(16,185,129,0.25)",
      }}
    >
      <span
        className="animate-live-pulse inline-block w-2 h-2 rounded-full"
        style={{ background: "#10B981", boxShadow: "0 0 6px #10B981" }}
      />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#10B981", letterSpacing: "0.12em" }}>
        LIVE_TRANSMISSION
      </span>
    </div>
  );
}

export function MediaPage() {
  const [activeTab, setActiveTab] = useState<"videos" | "podcasts" | "initiatives">("videos");
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  const [playingPodcast, setPlayingPodcast] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<number, number>>({});

  const tabs = [
    { id: "videos" as const, label: "VIDEO_ARCHIVE", icon: Youtube },
    { id: "podcasts" as const, label: "AUDIO_TRANSMISSIONS", icon: Headphones },
    { id: "initiatives" as const, label: "ACTIVE_MISSIONS", icon: Radio },
  ];

  const statusColors: Record<string, { bg: string; color: string }> = {
    ACTIVE: { bg: "rgba(16,185,129,0.12)", color: "#10B981" },
    ENROLLING: { bg: "rgba(249,115,22,0.12)", color: "#F97316" },
    UPCOMING: { bg: "rgba(59,130,246,0.12)", color: "#3B82F6" },
  };

  return (
    <div style={{ background: "#0B0F19", minHeight: "100vh" }} className="stardust">
      {/* Header */}
      <div
        className="pt-20 pb-14 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #05080F 0%, #0B0F19 100%)" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse-glow"
          style={{ background: "rgba(236,72,153,0.08)", filter: "blur(120px)" }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full pointer-events-none animate-pulse-glow"
          style={{ background: "rgba(59,130,246,0.07)", filter: "blur(100px)", animationDelay: "3s" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LiveBeacon />
          </div>
          <p
            className="mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EC4899", fontSize: "0.7rem", letterSpacing: "0.2em" }}
          >
            // ISYA_MEDIA_NODE :: TRANSMISSION_HUB
          </p>
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            Watch, Listen, Explore
          </h1>
          <p style={{ color: "#6B7280", lineHeight: 1.7, fontSize: "0.9rem" }}>
            Discover videos, podcasts, and missions from the ISYA community — all in one place.
          </p>

          {/* Signal bars decoration */}
          <div className="flex items-end justify-center gap-1 mt-6">
            {[8, 12, 16, 20, 16, 12, 8, 12, 16, 20, 16, 12, 8].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: h,
                  background: i === 4 || i === 8 ? "#EC4899" : "rgba(236,72,153,0.3)",
                  borderRadius: 2,
                  animation: `eq-bar 0.8s ease-in-out ${i * 0.06}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="sticky top-16 z-30"
        style={{
          background: "rgba(5,8,15,0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(236,72,153,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-2 px-5 py-4 transition-all duration-200 relative shrink-0"
                style={{
                  color: activeTab === id ? "#EC4899" : "#4B5563",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  fontWeight: activeTab === id ? 600 : 400,
                }}
              >
                <Icon size={14} />
                {label}
                {activeTab === id && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: "linear-gradient(90deg, transparent, #EC4899, transparent)" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Videos ── */}
        {activeTab === "videos" && (
          <div>
            <div
              className="flex items-center gap-3 mb-8"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#374151", letterSpacing: "0.1em" }}
            >
              <span style={{ color: "#EC4899" }}>▶</span>
              SECTOR_ARCHIVE :: VIDEO_FEEDS // {VIDEOS.length}_RECORDINGS_INDEXED
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VIDEOS.map((video, idx) => (
                <div
                  key={video.id}
                  className="rounded-xl overflow-hidden group cursor-pointer transition-all duration-400 relative"
                  style={{
                    background: "rgba(17,24,39,0.5)",
                    border: "1px solid rgba(236,72,153,0.08)",
                    backdropFilter: "blur(8px)",
                  }}
                  onClick={() => setLightboxVideo(video.youtubeId)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(236,72,153,0.25)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px rgba(236,72,153,0.08), 0 8px 32px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(236,72,153,0.08)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* HUD corner brackets */}
                  <div className="hud-corners absolute inset-0 pointer-events-none z-10" />

                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <ImageWithFallback
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Scan line overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)" }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                      style={{ background: "rgba(5,8,15,0.45)" }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: "rgba(236,72,153,0.85)",
                          boxShadow: "0 0 30px rgba(236,72,153,0.4)",
                        }}
                      >
                        <Play size={20} className="text-white ml-0.5" />
                      </div>
                    </div>
                    {/* Live badge */}
                    {video.isLive && (
                      <div className="absolute top-2 left-2">
                        <LiveBeacon />
                      </div>
                    )}
                    {/* Duration */}
                    <div
                      className="absolute bottom-2 right-2 px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(5,8,15,0.9)",
                        color: "#E5E7EB",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {video.duration}
                    </div>
                    {/* Index */}
                    <div
                      className="absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center"
                      style={{
                        background: "rgba(5,8,15,0.8)",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        color: "#4B5563",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3
                      className="text-white mb-2 transition-colors duration-200 group-hover:text-pink-300"
                      style={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.4 }}
                    >
                      {video.title}
                    </h3>
                    <div
                      className="flex items-center gap-3"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#374151", letterSpacing: "0.08em" }}
                    >
                      <span style={{ color: "#6B7280" }}>VIEWS_{video.views}</span>
                      <span>|</span>
                      <span style={{ color: "#EC4899" }}>AUTH_LEVEL: PUBLIC</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Podcasts ── */}
        {activeTab === "podcasts" && (
          <div className="max-w-3xl mx-auto">
            <div
              className="flex items-center gap-3 mb-8"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#374151", letterSpacing: "0.1em" }}
            >
              <span style={{ color: "#EC4899" }}>◉</span>
              AUDIO_CHANNEL :: ISYA_FREQUENCY // {PODCASTS.length}_EPISODES_AVAILABLE
            </div>

            {/* Now Playing indicator */}
            {playingPodcast !== null && (
              <div
                className="flex items-center gap-4 p-4 rounded-xl mb-6"
                style={{
                  background: "rgba(236,72,153,0.06)",
                  border: "1px solid rgba(236,72,153,0.2)",
                }}
              >
                <EQBars active={true} />
                <div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#EC4899", letterSpacing: "0.12em" }}>
                    NOW_BROADCASTING
                  </p>
                  <p className="text-white" style={{ fontSize: "0.85rem", fontWeight: 600, marginTop: 2 }}>
                    {PODCASTS.find((p) => p.id === playingPodcast)?.title}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {PODCASTS.map((ep) => {
                const isPlaying = playingPodcast === ep.id;
                return (
                  <div
                    key={ep.id}
                    className="p-5 rounded-xl transition-all duration-300 relative"
                    style={{
                      background: isPlaying ? "rgba(236,72,153,0.05)" : "rgba(17,24,39,0.5)",
                      border: `1px solid ${isPlaying ? "rgba(236,72,153,0.25)" : "rgba(236,72,153,0.06)"}`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {isPlaying && (
                      <div className="hud-corners absolute inset-0 pointer-events-none" />
                    )}
                    <div className="flex items-center gap-4">
                      {/* Play button */}
                      <button
                        onClick={() => setPlayingPodcast(isPlaying ? null : ep.id)}
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                        style={{
                          background: isPlaying ? "linear-gradient(135deg, #EC4899, #3B82F6)" : "rgba(236,72,153,0.1)",
                          color: isPlaying ? "#fff" : "#EC4899",
                          boxShadow: isPlaying ? "0 0 25px rgba(236,72,153,0.3)" : "none",
                          border: isPlaying ? "none" : "1px solid rgba(236,72,153,0.2)",
                        }}
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                      </button>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.65rem",
                              color: "#EC4899",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {ep.episode}
                          </span>
                          <span style={{ color: "#1F2937", fontSize: "0.65rem" }}>|</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#4B5563", letterSpacing: "0.06em" }}>
                            {ep.date}
                          </span>
                          <span style={{ color: "#1F2937", fontSize: "0.65rem" }}>|</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#374151", letterSpacing: "0.06em" }}>
                            FREQ_{ep.freq}
                          </span>
                        </div>
                        <p
                          className="text-white"
                          style={{ fontSize: "0.92rem", fontWeight: 600, lineHeight: 1.3 }}
                        >
                          {ep.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.62rem",
                            color: "#4B5563",
                            marginTop: "0.25rem",
                            letterSpacing: "0.06em",
                          }}
                        >
                          HOST: {ep.guest}
                        </p>

                        {/* Progress bar */}
                        {isPlaying && (
                          <div className="mt-3">
                            <div className="relative">
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={progress[ep.id] ?? 0}
                                onChange={(e) =>
                                  setProgress((prev) => ({ ...prev, [ep.id]: +e.target.value }))
                                }
                                className="w-full"
                                style={{ height: 3, accentColor: "#EC4899" }}
                              />
                            </div>
                            <div
                              className="flex justify-between mt-1"
                              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#374151" }}
                            >
                              <span>00:00</span>
                              <span>{ep.duration}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right side */}
                      <div className="shrink-0 flex flex-col items-end gap-2">
                        {isPlaying ? (
                          <EQBars active={true} />
                        ) : (
                          <div className="flex items-center gap-1" style={{ color: "#374151" }}>
                            <Clock size={12} />
                          </div>
                        )}
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.65rem",
                            color: "#4B5563",
                          }}
                        >
                          {ep.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Initiatives ── */}
        {activeTab === "initiatives" && (
          <div>
            <div
              className="flex items-center gap-3 mb-8"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#374151", letterSpacing: "0.1em" }}
            >
              <span style={{ color: "#EC4899" }}>◈</span>
              MISSION_CONTROL :: ACTIVE_OPERATIONS // {INITIATIVES.length}_MISSIONS_TRACKED
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {INITIATIVES.map((init) => {
                const sc = statusColors[init.status] ?? statusColors.UPCOMING;
                return (
                  <div
                    key={init.id}
                    className="p-8 rounded-xl transition-all duration-300 cursor-pointer group relative"
                    style={{
                      background: "rgba(17,24,39,0.5)",
                      border: "1px solid rgba(236,72,153,0.08)",
                      backdropFilter: "blur(8px)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(236,72,153,0.2)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 25px rgba(236,72,153,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(236,72,153,0.08)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="hud-corners absolute inset-0 pointer-events-none" />

                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                          style={{ background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.12)" }}
                        >
                          {init.icon}
                        </div>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#374151", letterSpacing: "0.1em" }}>
                          {init.code}
                        </p>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full"
                        style={{
                          background: sc.bg,
                          color: sc.color,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.62rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          border: `1px solid ${sc.color}33`,
                        }}
                      >
                        {init.status === "ACTIVE" && (
                          <span className="animate-live-pulse inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{ background: sc.color }} />
                        )}
                        {init.status}
                      </span>
                    </div>

                    <h3
                      className="text-white mb-2 transition-colors duration-200"
                      style={{ fontSize: "1.05rem", fontWeight: 700 }}
                    >
                      {init.title}
                    </h3>
                    <p style={{ color: "#6B7280", lineHeight: 1.6, fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                      {init.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#4B5563", letterSpacing: "0.08em" }}>
                        AGENTS_ENROLLED: <span style={{ color: "#9CA3AF" }}>{init.participants}</span>
                      </div>
                      <button
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200"
                        style={{
                          background: "rgba(236,72,153,0.08)",
                          color: "#EC4899",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          border: "1px solid rgba(236,72,153,0.18)",
                        }}
                      >
                        ACCESS_DETAILS
                        <ExternalLink size={11} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(5,8,15,0.95)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightboxVideo(null)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl overflow-hidden relative"
            style={{ border: "1px solid rgba(236,72,153,0.2)", boxShadow: "0 0 80px rgba(236,72,153,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hud-corners absolute inset-0 pointer-events-none z-10" />
            {/* Telemetry header */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ background: "rgba(5,8,15,0.9)", borderBottom: "1px solid rgba(236,72,153,0.1)" }}
            >
              <div
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#EC4899", letterSpacing: "0.1em" }}
                className="flex items-center gap-2"
              >
                <span className="animate-live-pulse inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#EC4899" }} />
                STREAM_ACTIVE // VIDEO_FEED_OPEN
              </div>
              <button
                onClick={() => setLightboxVideo(null)}
                className="w-7 h-7 rounded flex items-center justify-center transition-colors duration-150"
                style={{
                  background: "rgba(236,72,153,0.1)",
                  color: "#EC4899",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  border: "1px solid rgba(236,72,153,0.2)",
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div style={{ aspectRatio: "16/9" }}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${lightboxVideo}?autoplay=1`}
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Video player"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
