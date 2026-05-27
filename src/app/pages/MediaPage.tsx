import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Play, Pause, Clock, Headphones, Youtube, Radio, X, Search,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { toast } from "sonner";
import { mockDb, Webinar, Podcast } from "../utils/mockDb";

// ── Static initiative data ────────────────────────────────────────────────────
const INITIATIVES = [
  {
    id: 1,
    icon: "🛰️",
    title: "CubeSat Challenge",
    code: "INIT_CUBESAT",
    description:
      "Design and launch a student-built satellite with the support of ESA mentors.",
    participants: 124,
    status: "ACTIVE",
  },
  {
    id: 2,
    icon: "🔭",
    title: "Global Telescope Network",
    code: "INIT_GTN",
    description:
      "Connect with observatories worldwide and conduct coordinated observation campaigns.",
    participants: 340,
    status: "ACTIVE",
  },
  {
    id: 3,
    icon: "🧬",
    title: "Mars Habitat Design",
    code: "INIT_MARSHABITAT",
    description:
      "Engineer life-support systems for future Martian outposts in a global competition.",
    participants: 88,
    status: "ENROLLING",
  },
  {
    id: 4,
    icon: "📡",
    title: "Space Data Hackathon",
    code: "INIT_HACKATHON",
    description:
      "Analyze real mission data and compete for prizes from leading space agencies.",
    participants: 215,
    status: "UPCOMING",
  },
];

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "text-emerald-500 bg-emerald-500/10 border-emerald-500/25",
  ENROLLING: "text-orange-500 bg-orange-500/10 border-orange-500/25",
  UPCOMING: "text-blue-500 bg-blue-500/10 border-blue-500/25",
};

// ── Helper: extract YouTube ID ────────────────────────────────────────────────
function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
}

// ── Sub-component: Live beacon pill ──────────────────────────────────────────
function LiveBeacon() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
      <span
        className="animate-live-pulse inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]"
        aria-hidden="true"
      />
      <span className="font-mono text-xs text-emerald-500 tracking-[0.12em]">
        LIVE_TRANSMISSION
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function MediaPage() {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const navigate = useNavigate();
  const location = useLocation();

  // Tab state
  const [activeTab, setActiveTab] = useState<"videos" | "podcasts" | "initiatives">("videos");

  // Lightbox
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Data collections from mockDb
  const [webinars, setWebinars] = useState<Webinar[]>(() => mockDb.getWebinars());
  const [podcasts, setPodcasts] = useState<Podcast[]>(() => mockDb.getPodcasts());

  // Audio player state
  const [playingPodcast, setPlayingPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Refresh data once on mount
  useEffect(() => {
    setWebinars(mockDb.getWebinars());
    setPodcasts(mockDb.getPodcasts());
  }, []);

  // Sync active tab from URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") as typeof activeTab;
    if (hash === "videos" || hash === "podcasts" || hash === "initiatives") {
      setActiveTab(hash);
    }
  }, [location.hash]);

  // Keyboard / scroll-lock for lightbox
  useEffect(() => {
    if (!lightboxVideo) return;
    document.body.style.overflow = "hidden";
    lightboxCloseRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxVideo]);

  // Simulated audio progress ticker
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.5;
      });
    }, 500);
    return () => clearInterval(id);
  }, [isPlaying]);

  // Tab definitions — single source of truth for ids
  const TABS = [
    { id: "videos" as const, label: "VIDEO_ARCHIVE", icon: Youtube },
    { id: "podcasts" as const, label: "AUDIO_TRANSMISSIONS", icon: Headphones },
    { id: "initiatives" as const, label: "ACTIVE_MISSIONS", icon: Radio },
  ];

  const switchTab = useCallback(
    (id: typeof activeTab) => {
      setActiveTab(id);
      setSearchQuery("");
      navigate(`#${id}`, { replace: true });
    },
    [navigate],
  );

  // Filtered content driven by searchQuery
  const filteredWebinars = webinars.filter(
    (v) =>
      searchQuery === "" ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const filteredPodcasts = podcasts.filter(
    (p) =>
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.guest.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div ref={sectionRef} className="stardust bg-[#0B0F19] min-h-screen pb-28">

      {/* ── PAGE HEADER — bottom padding reduced to kill scroll seam ── */}
      <header className="pt-20 pb-6 text-center relative overflow-hidden bg-gradient-to-b from-[#05080F] to-[#0B0F19]">
        {/* Ambient nebula glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse-glow bg-pink-500/10 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-4">
            <LiveBeacon />
          </div>
          {/* WCAG FIX: text-xs replaces text-[0.7rem] */}
          <p className="font-mono text-pink-500 text-xs tracking-[0.2em] mb-2">
            // ISYA_MEDIA_NODE :: TRANSMISSION_HUB
          </p>
          <h1
            className="text-white font-extrabold leading-tight tracking-tight mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Watch, Listen, Explore
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Discover real-time video workshops, audio transmissions, and active
            satellite missions hosted across our network nodes.
          </p>
        </div>
      </header>

      {/* ── STICKY TAB BAR + SEARCH (unified — no visual gap seam) ── */}
      <div
        className="sticky top-16 z-30 bg-[#05080F]/95 backdrop-blur-xl border-b border-pink-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-2 py-0">

          {/* ARIA-connected tabs */}
          <div
            className="flex items-center gap-1 overflow-x-auto scrollbar-none"
            role="tablist"
            aria-label="Media hub sectors"
          >
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`tab-${id}`}
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`panel-${id}`}
                onClick={() => switchTab(id)}
                /* WCAG FIX: text-xs (14px) — was text-[0.7rem] (11px) */
                className={`tab-scifi flex items-center gap-2 px-4 py-3.5 transition-all duration-150 shrink-0 font-mono text-xs tracking-wider cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-inset ${
                  activeTab === id
                    ? "text-pink-500 font-bold"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          {/* Terminal search with blinking caret */}
          <div
            className={`terminal-input-wrapper relative flex items-center w-full md:w-60 pb-2 md:pb-0${searchQuery ? " has-text" : ""}`}
          >
            <Search
              size={14}
              className="absolute left-3 text-pink-500 z-10"
              aria-hidden="true"
            />
            <input
              id="media-search"
              type="search"
              placeholder="FILTER_TRANSMISSIONS_..."
              aria-label={`Search ${activeTab}`}
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-1.5 font-mono text-xs tracking-wide text-white bg-gray-900/40 border border-pink-500/10 rounded-md outline-none focus:border-pink-500/40 transition-all input-glow"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear filter"
                className="absolute right-2 p-1 text-gray-500 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── PANEL CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ══ VIDEO ARCHIVE PANEL ══════════════════════════════════════════ */}
        {activeTab === "videos" && (
          <section
            id="panel-videos"
            role="tabpanel"
            aria-labelledby="tab-videos"
            className="animate-slide-up"
          >
            <div className="flex items-center gap-2 mb-6 font-mono text-xs text-gray-500 tracking-wider">
              <span className="text-pink-500" aria-hidden="true">▶</span>
              SECTOR_ARCHIVE :: VIDEO_FEEDS // {filteredWebinars.length}_RECORDINGS_INDEXED
            </div>

            {filteredWebinars.length === 0 ? (
              <div className="py-20 text-center">
                <p
                  className="text-glitch font-mono text-pink-500 text-sm tracking-widest mb-3"
                  data-text="[!] NO_TRANSMISSIONS_FOUND"
                >
                  [!] NO_TRANSMISSIONS_FOUND
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 bg-pink-500/10 text-pink-500 border border-pink-500/30 rounded font-mono text-xs hover:bg-pink-500/20 transition-colors"
                >
                  CLEAR_FILTER
                </button>
              </div>
            ) : (
              /* ARIA FIX: semantic <ul>/<li>/<article> — no <button> wrapping block layout */
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {filteredWebinars.map((video, idx) => {
                  const ytId = getYouTubeId(video.videoUrl);
                  return (
                    <li key={video.id}>
                      <article className="rounded-xl overflow-hidden group bg-gray-900/40 border border-pink-500/5 backdrop-blur-md transition-all duration-300 post-card zero-g-hover h-full flex flex-col">

                        {/* Thumbnail: data-scan laser + visor-reflect */}
                        <div className="relative aspect-video overflow-hidden data-scan visor-reflect">
                          <ImageWithFallback
                            src={video.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Centered play button — post-card-link makes entire card clickable */}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                            <button
                              onClick={() => setLightboxVideo(ytId)}
                              aria-label={`Play transmission: ${video.title}`}
                              className="post-card-link w-14 h-14 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
                            >
                              <Play size={20} className="ml-0.5" aria-hidden="true" />
                            </button>
                          </div>

                          {video.isLive && (
                            <div className="absolute top-3 left-3 z-20 scale-90 origin-top-left">
                              <LiveBeacon />
                            </div>
                          )}

                          {/* Duration badge — WCAG FIX: text-xs not text-[0.7rem] */}
                          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-gray-300 font-mono text-xs border border-white/10 z-10">
                            35:00
                          </span>
                        </div>

                        {/* Card body */}
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-4 group-hover:text-pink-400 transition-colors">
                            {video.title}
                          </h3>
                          <div className="mt-auto flex items-center justify-between font-mono text-xs text-gray-500">
                            <span>1.2K_VIEWS</span>
                            <span className="text-pink-500/50">
                              IDX_{String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}

        {/* ══ AUDIO TRANSMISSIONS PANEL ════════════════════════════════════ */}
        {activeTab === "podcasts" && (
          <section
            id="panel-podcasts"
            role="tabpanel"
            aria-labelledby="tab-podcasts"
            className="max-w-4xl mx-auto space-y-4 animate-slide-up"
          >
            {filteredPodcasts.length === 0 ? (
              <div className="py-20 text-center">
                <p
                  className="text-glitch font-mono text-pink-500 text-sm tracking-widest mb-3"
                  data-text="[!] NO_AUDIO_FEEDS_FOUND"
                >
                  [!] NO_AUDIO_FEEDS_FOUND
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 bg-pink-500/10 text-pink-500 border border-pink-500/30 rounded font-mono text-xs hover:bg-pink-500/20 transition-colors"
                >
                  CLEAR_FILTER
                </button>
              </div>
            ) : (
              filteredPodcasts.map((podcast) => {
                const isActiveTrack = playingPodcast?.id === podcast.id;
                const isThisPlaying = isActiveTrack && isPlaying;

                return (
                  <article
                    key={podcast.id}
                    className="p-5 rounded-xl bg-gray-900/30 border border-pink-500/5 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-5 group hover:border-pink-500/20 transition-all duration-300 hud-corners"
                  >
                    {/* Play/Pause button */}
                    <button
                      onClick={() => {
                        if (isActiveTrack) {
                          setIsPlaying(!isPlaying);
                        } else {
                          setPlayingPodcast(podcast);
                          setIsPlaying(true);
                          setProgress(0);
                        }
                      }}
                      aria-label={
                        isThisPlaying
                          ? `Pause: ${podcast.title}`
                          : `Play: ${podcast.title}`
                      }
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                        isThisPlaying
                          ? "bg-pink-500 text-white shadow-[0_0_16px_rgba(236,72,153,0.5)]"
                          : "bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white"
                      }`}
                    >
                      {isThisPlaying ? (
                        <Pause size={18} aria-hidden="true" />
                      ) : (
                        <Play size={18} className="ml-0.5" aria-hidden="true" />
                      )}
                    </button>

                    {/* Podcast info */}
                    <div className="flex-1 min-w-0">
                      {/* Telemetry row with live EQ bars */}
                      <div className="flex items-center gap-3 mb-1 font-mono text-xs text-pink-500 tracking-wider flex-wrap">
                        <span>{podcast.episode}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500/20" aria-hidden="true" />
                        <span className="text-gray-500">{podcast.freq}</span>

                        {/* Dynamic EQ visualiser — only when this track is playing */}
                        {isThisPlaying && (
                          <div
                            className="flex items-end gap-[2px] h-3 ml-1"
                            aria-hidden="true"
                            aria-label="Now playing"
                          >
                            <div className="eq-bar bg-pink-500 h-full w-[3px] rounded" style={{ animationDelay: "0s" }} />
                            <div className="eq-bar bg-pink-500 h-full w-[3px] rounded" style={{ animationDelay: "0.15s" }} />
                            <div className="eq-bar bg-pink-500 h-full w-[3px] rounded" style={{ animationDelay: "0.3s" }} />
                            <div className="eq-bar bg-orange-400 h-full w-[3px] rounded" style={{ animationDelay: "0.1s" }} />
                          </div>
                        )}
                      </div>

                      <h3 className="text-white font-bold text-base md:text-lg group-hover:text-pink-400 transition-colors truncate">
                        {podcast.title}
                      </h3>
                      <p className="text-gray-500 font-mono text-xs mt-1 tracking-wider">
                        GUEST // {podcast.guest.toUpperCase()}
                      </p>
                    </div>

                    {/* Duration / date */}
                    <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 gap-2 font-mono text-xs text-gray-500 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-pink-500/60" aria-hidden="true" />
                        {podcast.duration}
                      </div>
                      <span>{podcast.date}</span>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        )}

        {/* ══ ACTIVE MISSIONS PANEL ════════════════════════════════════════ */}
        {activeTab === "initiatives" && (
          <section
            id="panel-initiatives"
            role="tabpanel"
            aria-labelledby="tab-initiatives"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up"
          >
            {INITIATIVES.map((init) => (
              <article
                key={init.id}
                className="p-6 md:p-8 rounded-2xl glass-card hud-corners border border-white/5 flex flex-col gap-5 group hover:border-pink-500/15 transition-all cosmic-dust-card"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl" role="img" aria-label="Mission icon">
                    {init.icon}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full font-mono text-xs font-bold tracking-wider border ${STATUS_COLORS[init.status]}`}
                  >
                    {init.status}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xs text-pink-500 tracking-wider block mb-1">
                    // {init.code}
                  </span>
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
                    {init.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {init.description}
                  </p>
                </div>

                <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">
                    PARTICIPANTS // {init.participants}
                  </span>
                  <button
                    onClick={() =>
                      toast.success(
                        `Successfully enlisted in ${init.title}! Mission files synced.`,
                      )
                    }
                    className="flex items-center gap-1 text-blue-400 font-mono text-xs font-extrabold tracking-widest hover:text-blue-300 transition-colors cursor-pointer btn-press focus-visible:outline-none focus-visible:underline"
                  >
                    ENLIST_NOW →
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      {/* ── VIDEO LIGHTBOX ─────────────────────────────────────────────────── */}
      {lightboxVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          <button
            ref={lightboxCloseRef}
            onClick={() => setLightboxVideo(null)}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close video player"
          >
            <X size={28} aria-hidden="true" />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-modal-content">
            <iframe
              src={`https://www.youtube.com/embed/${lightboxVideo}?autoplay=1`}
              title="Space Transmission Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* ── AUDIO PLAYER DOCK ──────────────────────────────────────────────── */}
      {playingPodcast && (
        <div
          className="fixed bottom-0 inset-x-0 z-50 bg-[#05080F]/95 backdrop-blur-md border-t border-pink-500/20 p-4 shadow-[0_-8px_32px_rgba(236,72,153,0.15)] animate-slide-up"
          role="region"
          aria-label="Now playing"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Track info */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <div
                className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 border border-pink-500/20 animate-pulse font-mono text-sm"
                aria-hidden="true"
              >
                📻
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-pink-500 tracking-wider truncate">
                  NOW_STREAMING // {playingPodcast.episode}
                </p>
                <h4 className="text-white text-sm font-semibold truncate max-w-[220px] md:max-w-[300px]">
                  {playingPodcast.title}
                </h4>
              </div>
            </div>

            {/* Progress + controls */}
            <div className="flex flex-1 max-w-xl items-center gap-4 w-full">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer shadow-[0_0_12px_rgba(236,72,153,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={18} aria-hidden="true" />
                ) : (
                  <Play size={18} className="ml-0.5" aria-hidden="true" />
                )}
              </button>

              <div className="flex-1 flex items-center gap-3">
                <span className="font-mono text-[10px] text-gray-500 tabular-nums" aria-hidden="true">
                  {String(Math.floor((progress / 100) * 45)).padStart(2, "0")}:00
                </span>
                {/* Clickable progress bar */}
                <div
                  role="slider"
                  aria-label="Playback progress"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                  className="flex-1 h-1.5 rounded bg-white/10 overflow-hidden relative cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") setProgress((p) => Math.min(100, p + 2));
                    if (e.key === "ArrowLeft") setProgress((p) => Math.max(0, p - 2));
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-gray-500 tabular-nums" aria-hidden="true">
                  {playingPodcast.duration}
                </span>
              </div>
            </div>

            {/* Dismiss */}
            <div className="flex items-center justify-end gap-3 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-2 md:pt-0">
              <button
                onClick={() => {
                  setPlayingPodcast(null);
                  setIsPlaying(false);
                  setProgress(0);
                }}
                className="text-gray-400 hover:text-white p-1 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                aria-label="Close audio player"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
