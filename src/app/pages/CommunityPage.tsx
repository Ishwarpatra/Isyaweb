import { useState } from "react";
import { Search, MapPin, MessageCircle, Heart, Share2, Plus } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const MEMBERS = [
  { id: 1, name: "Sarah Chen", role: "Astrophysicist", country: "🇺🇸 USA", avatar: "SC", color: "#FFA500", joined: "2024", posts: 34 },
  { id: 2, name: "David Osei", role: "Research Fellow", country: "🇬🇭 Ghana", avatar: "DO", color: "#EC4899", joined: "2023", posts: 61 },
  { id: 3, name: "Yuki Tanaka", role: "Radio Astronomer", country: "🇯🇵 Japan", avatar: "YT", color: "#4A90E2", joined: "2025", posts: 22 },
  { id: 4, name: "Amara Diallo", role: "Science Communicator", country: "🇸🇳 Senegal", avatar: "AD", color: "#00D9FF", joined: "2024", posts: 48 },
  { id: 5, name: "Luis Reyes", role: "Aerospace Engineer", country: "🇲🇽 Mexico", avatar: "LR", color: "#10B981", joined: "2023", posts: 77 },
  { id: 6, name: "Fatima Al-Rashid", role: "Space Policy Analyst", country: "🇸🇦 Saudi Arabia", avatar: "FA", color: "#FFD700", joined: "2025", posts: 19 },
  { id: 7, name: "Carlos Mendez", role: "Robotics Engineer", country: "🇦🇷 Argentina", avatar: "CM", color: "#EC4899", joined: "2024", posts: 41 },
  { id: 8, name: "Priya Sharma", role: "Data Scientist", country: "🇮🇳 India", avatar: "PS", color: "#FFA500", joined: "2023", posts: 55 },
];

const POSTS = [
  {
    id: 1,
    author: "David Osei",
    avatar: "DO",
    color: "#EC4899",
    time: "2 hours ago",
    content: "Just submitted our CubeSat proposal to the IAF review board! 🛰️ Six months of hard work finally coming together. Fingers crossed for the funding decision in June. Anyone else here competing this cycle?",
    likes: 47,
    comments: 12,
    liked: false,
  },
  {
    id: 2,
    author: "Yuki Tanaka",
    avatar: "YT",
    color: "#4A90E2",
    time: "5 hours ago",
    content: "Our observatory team just completed our first joint observation session with the team in Chile! Coordinating across time zones was tricky but totally worth it — we captured some incredible data on the Eta Carinae nebula.",
    likes: 83,
    comments: 24,
    liked: true,
  },
  {
    id: 3,
    author: "Sarah Chen",
    avatar: "SC",
    color: "#FFA500",
    time: "1 day ago",
    content: "Sharing a resource: I compiled a list of free online courses for young astronomers — from basic celestial mechanics to intro to radio astronomy. DM me if you'd like the full list! 📚 Happy to help anyone who's just starting out.",
    likes: 129,
    comments: 38,
    liked: false,
  },
  {
    id: 4,
    author: "Luis Reyes",
    avatar: "LR",
    color: "#10B981",
    time: "2 days ago",
    content: "Quick update: our team's Mars habitat pressure vessel passed all simulated stress tests this week 🎉 On to thermal-vacuum testing next month. Science is slow but progress is progress!",
    likes: 64,
    comments: 15,
    liked: false,
  },
];

const UPCOMING = [
  { id: 1, title: "Webinar: Life on Europa?", date: "May 22", type: "Webinar" },
  { id: 2, title: "CubeSat Workshop — Module 3", date: "May 25", type: "Workshop" },
  { id: 3, title: "Annual Symposium 2026", date: "Jun 15", type: "Event" },
  { id: 4, title: "Space Hackathon Registration Closes", date: "Jun 30", type: "Deadline" },
];

const EVENT_COLORS: Record<string, string> = {
  Webinar: "text-blue-400 bg-blue-400/10",
  Workshop: "text-orange-400 bg-orange-400/10",
  Event: "text-pink-400 bg-pink-400/10",
  Deadline: "text-red-400 bg-red-400/10",
};

export function CommunityPage() {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [activeView, setActiveView] = useState<"feed" | "members">("feed");
  const [search, setSearch] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2]));

  const filteredMembers = MEMBERS.filter((m) =>
    search === "" || m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div ref={sectionRef} className="stardust bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-10 reveal">
          <p className="font-mono text-orange-500 text-[0.7rem] tracking-[0.15em] mb-2 uppercase">
            // MEMBER_COMMUNITY :: STATUS_ONLINE
          </p>
          <h1 className="text-white text-[clamp(2rem,5vw,2.8rem)] font-bold leading-tight">
            Connect with Space Enthusiasts
          </h1>
        </div>

        {/* Tab toggle */}
        <div className="flex gap-2 mb-8" role="tablist">
          {(["feed", "members"] as const).map((view) => (
            <button
              key={view}
              role="tab"
              aria-selected={activeView === view}
              onClick={() => setActiveView(view)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all border ${
                activeView === view 
                  ? "bg-orange-500/10 text-orange-500 border-orange-500/30" 
                  : "bg-white/5 text-gray-500 border-white/5 hover:bg-white/10"
              }`}
            >
              {view === "feed" ? "Community Feed" : "Members Directory"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {activeView === "feed" && (
              <div role="tabpanel" className="space-y-6">
                {/* Compose box */}
                <div className="p-4 rounded-2xl bg-[#0F1629] border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">ME</span>
                  </div>
                  <button className="flex-1 px-4 py-2.5 rounded-xl text-left text-gray-500 text-sm bg-white/5 hover:bg-white/10 transition-colors">
                    Share something with the community...
                  </button>
                  <button
                    aria-label="Create post"
                    className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 text-white hover:scale-105 transition-transform"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Feed */}
                <div className="space-y-4">
                  {POSTS.map((post) => {
                    const liked = likedPosts.has(post.id);
                    return (
                      <article
                        key={post.id}
                        className="p-6 rounded-2xl bg-[#0F1629] border border-white/5"
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: post.color }}
                          >
                            <span className="text-white text-sm font-bold">{post.avatar}</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold text-[0.95rem]">
                              {post.author}
                            </p>
                            <p className="text-gray-500 text-xs">{post.time}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-[0.9rem] mb-5">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? "text-pink-500" : "text-gray-500 hover:text-gray-300"}`}
                          >
                            <Heart size={16} fill={liked ? "currentColor" : "none"} />
                            {post.likes + (liked && !post.liked ? 1 : !liked && post.liked ? -1 : 0)}
                          </button>
                          <button className="flex items-center gap-1.5 text-gray-500 text-sm hover:text-gray-300">
                            <MessageCircle size={16} />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-1.5 text-gray-500 text-sm hover:text-gray-300 ml-auto">
                            <Share2 size={16} />
                            Share
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {activeView === "members" && (
              <div role="tabpanel">
                <div className="relative mb-6">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search members by name or role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm bg-[#0F1629] border border-white/10 focus:border-orange-500/50 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-5 rounded-2xl flex items-center gap-4 bg-[#0F1629] border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                        style={{ background: member.color }}
                      >
                        <span className="text-white font-bold">{member.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-[0.95rem] truncate">{member.name}</p>
                        <p className="text-gray-500 text-xs truncate">{member.role}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin size={12} className="text-gray-600" />
                          <span className="text-gray-600 text-[0.75rem]">{member.country}</span>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 hover:bg-blue-400/20 transition-colors shrink-0">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Your profile card */}
            <div className="p-6 rounded-2xl bg-[#0F1629] border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold">ME</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Your Profile</p>
                  <p className="text-gray-500 text-xs">ISYA Member since 2026</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[{ v: "12", l: "Posts" }, { v: "48", l: "Connections" }, { v: "3", l: "Projects" }].map(({ v, l }) => (
                  <div key={l}>
                    <p className="text-white font-bold">{v}</p>
                    <p className="text-gray-500 text-[0.7rem]">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming events */}
            <div className="p-6 rounded-2xl bg-[#0F1629] border border-white/10">
              <h3 className="text-white font-semibold text-[0.95rem] mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {UPCOMING.map((ev) => (
                  <div key={ev.id} className="flex items-center gap-3">
                    <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-center ${EVENT_COLORS[ev.type]}`}>
                      <span className="font-mono text-[0.65rem] font-bold leading-tight">
                        {ev.date.split(" ")[0]}
                        <br />
                        {ev.date.split(" ")[1]}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-[0.85rem] font-medium leading-tight mb-1">{ev.title}</p>
                      <span className={`text-[0.7rem] font-bold uppercase tracking-wider ${EVENT_COLORS[ev.type].split(" ")[0]}`}>
                        {ev.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                VIEW_ALL_EVENTS_
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
