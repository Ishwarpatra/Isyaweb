import { useState, useEffect } from "react";
import { Play, Pause, Clock, Headphones, Youtube, ExternalLink, Radio, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollReveal } from "../hooks/useScrollReveal";

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

function LiveBeacon() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
      <span className="animate-live-pulse inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]" />
      <span className="font-mono text-[0.65rem] text-emerald-500 tracking-[0.12em]">
        LIVE_TRANSMISSION
      </span>
    </div>
  );
}

export function MediaPage() {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<"videos" | "podcasts" | "initiatives">("videos");
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);

  const tabs = [
    { id: "videos" as const, label: "VIDEO_ARCHIVE", icon: Youtube },
    { id: "podcasts" as const, label: "AUDIO_TRANSMISSIONS", icon: Headphones },
    { id: "initiatives" as const, label: "ACTIVE_MISSIONS", icon: Radio },
  ];

  const statusColors: Record<string, string> = {
    ACTIVE: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    ENROLLING: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    UPCOMING: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  };

  useEffect(() => {
    if (lightboxVideo) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxVideo(null);
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [lightboxVideo]);

  return (
    <div ref={sectionRef} className="stardust bg-[#0B0F19] min-h-screen">
      {/* Header */}
      <div className="pt-20 pb-14 text-center relative overflow-hidden bg-gradient-to-b from-[#05080F] to-[#0B0F19]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse-glow bg-pink-500/10 blur-[120px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LiveBeacon />
          </div>
          <p className="font-mono text-pink-500 text-[0.7rem] tracking-[0.2em] mb-3">
            // ISYA_MEDIA_NODE :: TRANSMISSION_HUB
          </p>
          <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight mb-4">
            Watch, Listen, Explore
          </h1>
          <p className="text-gray-500 text-[0.9rem] leading-relaxed">
            Discover videos, podcasts, and missions from the ISYA community — all in one place.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-[#05080F]/90 backdrop-blur-xl border-b border-pink-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide" role="tablist">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-4 transition-all duration-200 relative shrink-0 font-mono text-[0.7rem] tracking-widest ${
                  activeTab === id ? "text-pink-500 font-bold" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Icon size={14} />
                {label}
                {activeTab === id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Videos */}
        {activeTab === "videos" && (
          <div role="tabpanel">
            <div className="flex items-center gap-3 mb-8 font-mono text-[0.65rem] text-gray-700 tracking-wider">
              <span className="text-pink-500">▶</span>
              SECTOR_ARCHIVE :: VIDEO_FEEDS // {VIDEOS.length}_RECORDINGS_INDEXED
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEOS.map((video, idx) => (
                <button
                  key={video.id}
                  onClick={() => setLightboxVideo(video.youtubeId)}
                  className="text-left rounded-xl overflow-hidden group bg-gray-900/50 border border-pink-500/10 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-pink-500/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative"
                >
                  <div className="hud-corners absolute inset-0 pointer-events-none z-10" />
                  <div className="relative aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-pink-500/80 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.4)] group-hover:scale-110 transition-transform">
                        <Play size={20} className="text-white ml-0.5" />
                      </div>
                    </div>
                    {video.isLive && (
                      <div className="absolute top-2 left-2 scale-75 origin-top-left">
                        <LiveBeacon />
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/90 text-gray-200 font-mono text-[0.7rem] border border-white/10">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-3 group-hover:text-pink-500 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between font-mono text-[0.6rem] text-gray-500">
                      <span>{video.views} VIEWS</span>
                      <span>IDX_{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Podcasts */}
        {activeTab === "podcasts" && (
          <div role="tabpanel" className="max-w-4xl mx-auto space-y-4">
            {PODCASTS.map((podcast) => (
              <div
                key={podcast.id}
                className="p-6 rounded-xl bg-gray-900/50 border border-pink-500/10 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:border-pink-500/30 transition-colors"
              >
                <button className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all shrink-0">
                  <Play size={20} className="ml-0.5" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 font-mono text-[0.6rem] text-pink-500 tracking-wider">
                    <span>{podcast.episode}</span>
                    <span className="w-1 h-1 rounded-full bg-pink-500/30" />
                    <span>{podcast.freq}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg group-hover:text-pink-500 transition-colors">
                    {podcast.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    GUEST: {podcast.guest}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 font-mono text-[0.65rem] text-gray-600 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {podcast.duration}
                  </div>
                  <div>{podcast.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Initiatives */}
        {activeTab === "initiatives" && (
          <div role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIATIVES.map((init) => (
              <div
                key={init.id}
                className="p-8 rounded-2xl glass-card hud-corners border border-white/5 flex flex-col gap-6 group hover:border-pink-500/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{init.icon}</div>
                  <span className={`px-3 py-1 rounded-full font-mono text-[0.6rem] font-bold tracking-wider border ${statusColors[init.status]}`}>
                    {init.status}
                  </span>
                </div>
                <div>
                  <div className="font-mono text-[0.65rem] text-pink-500 tracking-wider mb-1">
                    // {init.code}
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3 group-hover:text-pink-500 transition-colors">
                    {init.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {init.description}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="font-mono text-[0.65rem] text-gray-500">
                    PARTICIPANTS: {init.participants}
                  </div>
                  <button className="flex items-center gap-2 text-blue-500 font-mono text-[0.65rem] font-bold tracking-widest hover:text-blue-400 transition-colors">
                    ENLIST_NOW →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
          <button
            onClick={() => setLightboxVideo(null)}
            className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white transition-colors"
            aria-label="Close video"
          >
            <X size={32} />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${lightboxVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
