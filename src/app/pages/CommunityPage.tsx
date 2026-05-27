import React, { useState } from "react";
import { Search, MapPin, MessageCircle, Heart, Share2, Plus, X, AlertCircle } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

export interface Member {
  id: number;
  name: string;
  role: string;
  country: string;
  color: string;
  joined: string;
  posts: number;
  connected?: boolean;
}

export interface Post {
  id: number;
  author: string;
  avatar: string;
  color: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const MEMBERS: Member[] = [
  { id: 1, name: "Sarah Chen", role: "Astrophysicist", country: "🇺🇸 USA", color: "#FFA500", joined: "2024", posts: 34 },
  { id: 2, name: "David Osei", role: "Research Fellow", country: "🇬🇭 Ghana", color: "#EC4899", joined: "2023", posts: 61 },
  { id: 3, name: "Yuki Tanaka", role: "Radio Astronomer", country: "🇯🇵 Japan", color: "#4A90E2", joined: "2025", posts: 22 },
  { id: 4, name: "Amara Diallo", role: "Science Communicator", country: "🇸🇳 Senegal", color: "#00D9FF", joined: "2024", posts: 48 },
  { id: 5, name: "Luis Reyes", role: "Aerospace Engineer", country: "🇲🇽 Mexico", color: "#10B981", joined: "2023", posts: 77 },
  { id: 6, name: "Fatima Al-Rashid", role: "Space Policy Analyst", country: "🇸🇦 Saudi Arabia", color: "#FFD700", joined: "2025", posts: 19 },
  { id: 7, name: "Carlos Mendez", role: "Robotics Engineer", country: "🇦🇷 Argentina", color: "#EC4899", joined: "2024", posts: 41 },
  { id: 8, name: "Priya Sharma", role: "Data Scientist", country: "🇮🇳 India", color: "#FFA500", joined: "2023", posts: 55 },
];

const INITIAL_POSTS: Post[] = [
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

export function getInitials(name: string): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function CommunityPage() {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<"feed" | "members">("feed");
  const [search, setSearch] = useState("");

  // Stateful posts & members
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [members, setMembers] = useState<Member[]>(MEMBERS);

  // Modal State
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const filteredMembers = members.filter((m) =>
    search === "" ||
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const liked = !post.liked;
          return {
            ...post,
            liked,
            likes: liked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const handleConnect = (id: number) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextState = !m.connected;
          if (nextState) {
            toast.success(`Connection request sent to ${m.name}!`);
          } else {
            toast.success(`Removed connection request to ${m.name}.`);
          }
          return { ...m, connected: nextState };
        }
        return m;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) {
      toast.error("Cannot broadcast empty signal transmission.");
      return;
    }

    const postAuthorName = user ? user.name : "Guest Cadet";
    const postColor = user?.role === "admin" ? "#EC4899" : "#FFA500";

    const newPost: Post = {
      id: Date.now(),
      author: postAuthorName,
      avatar: getInitials(postAuthorName),
      color: postColor,
      time: "Just now",
      content: newPostContent.trim(),
      likes: 0,
      comments: 0,
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setIsComposeOpen(false);
    toast.success("Broadcast packet sent successfully!");
  };

  return (
    <div ref={sectionRef} className="stardust bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-10 reveal">
          <p className="font-mono text-orange-500 text-xs tracking-[0.15em] mb-2 uppercase">
            // MEMBER_COMMUNITY :: STATUS_ONLINE
          </p>
          <h1 className="text-white text-4xl text-[clamp(2rem,5vw,2.8rem)] font-bold leading-tight">
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
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                activeView === view 
                  ? "bg-orange-500/10 text-orange-500 border-orange-500/30" 
                  : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10"
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
                    <span className="text-white text-xs font-bold font-mono">
                      {user ? getInitials(user.name) : "ME"}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsComposeOpen(true)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-left text-gray-400 text-xs bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Share something with the community...
                  </button>
                  <button
                    onClick={() => setIsComposeOpen(true)}
                    aria-label="Create post"
                    className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 text-white hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Feed */}
                <div className="space-y-4">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="p-6 rounded-2xl bg-[#0F1629] border border-white/5"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: post.color }}
                        >
                          <span className="text-white text-xs font-bold font-mono">{post.avatar}</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-xs">
                            {post.author}
                          </p>
                          <p className="text-gray-400 text-xs font-mono">{post.time}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-xs mb-5">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                            post.liked ? "text-pink-500 font-bold" : "text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          <Heart size={16} fill={post.liked ? "currentColor" : "none"} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-400 text-xs hover:text-gray-200 cursor-pointer">
                          <MessageCircle size={16} />
                          {post.comments}
                        </button>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(post.content);
                            toast.success("Signal coordinates copied to clipboard!");
                          }}
                          className="flex items-center gap-1.5 text-gray-400 text-xs hover:text-gray-200 ml-auto cursor-pointer"
                        >
                          <Share2 size={16} />
                          Share
                        </button>
                      </div>
                    </article>
                  ))}
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-xs bg-[#0F1629] border border-white/10 focus:border-orange-500/50 outline-none transition-colors"
                  />
                </div>
                {/* Fixed cols: responsive grid col sizes correctly fit tablets & wider devices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-5 rounded-2xl flex items-center gap-4 bg-[#0F1629] border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                        style={{ background: member.color }}
                      >
                        <span className="text-white font-bold font-mono">{getInitials(member.name)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-xs truncate">{member.name}</p>
                        <p className="text-gray-400 text-xs truncate">{member.role}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin size={12} className="text-gray-500" />
                          <span className="text-gray-500 text-xs">{member.country}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect(member.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${
                          member.connected 
                            ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 hover:bg-emerald-400/20"
                            : "text-blue-400 bg-blue-400/10 border border-blue-400/20 hover:bg-blue-400/20"
                        }`}
                      >
                        {member.connected ? "Pending" : "Connect"}
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
                  <span className="text-white font-bold font-mono">
                    {user ? getInitials(user.name) : "ME"}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-xs">Your Profile</p>
                  <p className="text-gray-400 text-xs">ISYA Member since 2026</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center border-t border-white/5 pt-4">
                {[{ v: "12", l: "Posts" }, { v: "48", l: "Connections" }, { v: "3", l: "Projects" }].map(({ v, l }) => (
                  <div key={l}>
                    <p className="text-white font-bold text-xs">{v}</p>
                    <p className="text-gray-400 text-xs">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming events */}
            <div className="p-6 rounded-2xl bg-[#0F1629] border border-white/10">
              <h3 className="text-white font-semibold text-xs mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {UPCOMING.map((ev) => (
                  <div key={ev.id} className="flex items-center gap-3">
                    <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-center ${EVENT_COLORS[ev.type]}`}>
                      <span className="font-mono text-xs font-bold leading-tight">
                        {ev.date.split(" ")[0]}
                        <br />
                        {ev.date.split(" ")[1]}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium leading-tight mb-1">{ev.title}</p>
                      <span className={`text-xs font-bold uppercase tracking-wider ${EVENT_COLORS[ev.type].split(" ")[0]}`}>
                        {ev.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => toast.info("Full event archives coming soon!")}
                className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                VIEW_ALL_EVENTS_
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Compose Signal Modal (Accessible custom Dialog) */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#0F1629] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative hud-corners animate-fade-up">
            <button
              onClick={() => setIsComposeOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            <div className="mb-4">
              <h2 className="text-white text-lg font-bold font-mono">// COMPOSE_BROADCAST_SIGNAL</h2>
              <p className="text-gray-400 text-xs">Transmit a new data pack to the community feed.</p>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  maxLength={280}
                  placeholder="Share a project update, question, or resource..."
                  rows={5}
                  className="w-full bg-gray-950/60 border border-white/10 rounded-xl p-4 text-white text-xs outline-none focus:border-orange-500/50 transition-colors resize-none"
                />
                <div className="flex justify-between mt-1 text-gray-500 text-xs font-mono">
                  <span>LIMIT: 280</span>
                  <span className={newPostContent.length >= 260 ? "text-orange-500" : ""}>
                    {newPostContent.length} / 280
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  TRANSMIT_SIGNAL →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
