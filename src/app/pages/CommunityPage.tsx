import { useState } from "react";
import { Search, MapPin, MessageCircle, Heart, Share2, Plus } from "lucide-react";

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
  Webinar: "#4A90E2",
  Workshop: "#FFA500",
  Event: "#EC4899",
  Deadline: "#EF4444",
};

export function CommunityPage() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-2" style={{ color: "#FFA500", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Member Community
        </p>
        <h1 className="text-white" style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2 }}>
          Connect with Space Enthusiasts
        </h1>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-2 mb-8">
        {(["feed", "members"] as const).map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className="px-5 py-2 rounded-xl capitalize transition-all duration-200"
            style={{
              background: activeView === view ? "rgba(255,165,0,0.12)" : "rgba(255,255,255,0.04)",
              color: activeView === view ? "#FFA500" : "#7A8894",
              border: `1px solid ${activeView === view ? "rgba(255,165,0,0.3)" : "rgba(255,255,255,0.06)"}`,
              fontWeight: activeView === view ? 600 : 400,
              fontSize: "0.875rem",
            }}
          >
            {view === "feed" ? "Community Feed" : "Members Directory"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {activeView === "feed" && (
            <div>
              {/* Compose box */}
              <div
                className="p-4 rounded-2xl mb-6 flex items-center gap-3"
                style={{ background: "#0F1629", border: "1px solid rgba(74,144,226,0.12)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #FFA500, #EC4899)" }}
                >
                  <span className="text-white text-sm font-bold">ME</span>
                </div>
                <div
                  className="flex-1 px-4 py-2.5 rounded-xl cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.04)", color: "#7A8894", fontSize: "0.9rem" }}
                >
                  Share something with the community...
                </div>
                <button
                  className="p-2.5 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #FFA500, #EC4899)", color: "#fff" }}
                  aria-label="Create post"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Feed */}
              <div className="flex flex-col gap-4">
                {POSTS.map((post) => {
                  const liked = likedPosts.has(post.id);
                  return (
                    <article
                      key={post.id}
                      className="p-6 rounded-2xl"
                      style={{ background: "#0F1629", border: "1px solid rgba(74,144,226,0.1)" }}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: post.color }}
                        >
                          <span className="text-white text-sm font-bold">{post.avatar}</span>
                        </div>
                        <div>
                          <p className="text-white" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                            {post.author}
                          </p>
                          <p style={{ color: "#7A8894", fontSize: "0.8rem" }}>{post.time}</p>
                        </div>
                      </div>
                      <p style={{ color: "#B0B8C1", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1.25rem" }}>
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1.5 transition-colors duration-200"
                          style={{ color: liked ? "#EC4899" : "#7A8894", fontSize: "0.875rem" }}
                        >
                          <Heart size={16} fill={liked ? "#EC4899" : "none"} />
                          {post.likes + (liked && !post.liked ? 1 : !liked && post.liked ? -1 : 0)}
                        </button>
                        <button
                          className="flex items-center gap-1.5"
                          style={{ color: "#7A8894", fontSize: "0.875rem" }}
                        >
                          <MessageCircle size={16} />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1.5 ml-auto" style={{ color: "#7A8894", fontSize: "0.875rem" }}>
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
            <div>
              <div className="relative mb-6">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#7A8894" }} />
                <input
                  type="text"
                  placeholder="Search members by name or role..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl outline-none"
                  style={{
                    background: "#0F1629",
                    border: "1px solid rgba(74,144,226,0.2)",
                    color: "#fff",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-5 rounded-2xl flex items-center gap-4 transition-all duration-200 cursor-pointer"
                    style={{ background: "#0F1629", border: "1px solid rgba(74,144,226,0.1)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: member.color }}
                    >
                      <span className="text-white font-bold">{member.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white" style={{ fontWeight: 600, fontSize: "0.95rem" }}>{member.name}</p>
                      <p style={{ color: "#7A8894", fontSize: "0.8rem" }}>{member.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={12} style={{ color: "#7A8894" }} />
                        <span style={{ color: "#7A8894", fontSize: "0.75rem" }}>{member.country}</span>
                      </div>
                    </div>
                    <button
                      className="px-3 py-1.5 rounded-lg shrink-0"
                      style={{
                        background: "rgba(74,144,226,0.1)",
                        color: "#4A90E2",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        border: "1px solid rgba(74,144,226,0.2)",
                      }}
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Your profile card */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: "#0F1629", border: "1px solid rgba(74,144,226,0.12)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #FFA500, #EC4899)" }}
              >
                <span className="text-white font-bold">ME</span>
              </div>
              <div>
                <p className="text-white" style={{ fontWeight: 600 }}>Your Profile</p>
                <p style={{ color: "#7A8894", fontSize: "0.8rem" }}>ISYA Member since 2026</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{ v: "12", l: "Posts" }, { v: "48", l: "Connections" }, { v: "3", l: "Projects" }].map(({ v, l }) => (
                <div key={l}>
                  <p className="text-white" style={{ fontWeight: 700 }}>{v}</p>
                  <p style={{ color: "#7A8894", fontSize: "0.75rem" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming events */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: "#0F1629", border: "1px solid rgba(74,144,226,0.12)" }}
          >
            <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
              Upcoming Events
            </h3>
            <div className="flex flex-col gap-3">
              {UPCOMING.map((ev) => (
                <div key={ev.id} className="flex items-center gap-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-center"
                    style={{ background: `${EVENT_COLORS[ev.type]}18`, color: EVENT_COLORS[ev.type] }}
                  >
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, lineHeight: 1.2 }}>
                      {ev.date.split(" ")[0]}
                      <br />
                      {ev.date.split(" ")[1]}
                    </span>
                  </div>
                  <div>
                    <p className="text-white" style={{ fontSize: "0.85rem", fontWeight: 500 }}>{ev.title}</p>
                    <span
                      style={{
                        color: EVENT_COLORS[ev.type],
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    >
                      {ev.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
