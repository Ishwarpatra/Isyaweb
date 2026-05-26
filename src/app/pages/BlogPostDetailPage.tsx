import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, MessageSquare, Clock, Calendar, Send, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getInitials } from "./CommunityPage";
import { toast } from "sonner";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  time: string;
  text: string;
}

const POST_CONTENTS: Record<number, { title: string, date: string, author: string, tag: string, tagColor: string, readTime: string, image: string, body: string[] }> = {
  1: {
    title: "ISYA Members Join ESA's Young Graduate Traineeship Program",
    date: "2026-05-14",
    author: "CADET_CHEN_S",
    tag: "MISSION_UPDATE",
    tagColor: "#F97316",
    readTime: "4 MIN",
    image: "https://images.unsplash.com/photo-1727034394040-0377258a5791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlc2NvcGUlMjBvYnNlcnZhdG9yeSUyMG5pZ2h0JTIwc2t5JTIwc3RhcnN8ZW58MXx8fHwxNzc5MTIxMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    body: [
      "Fifteen cadets from the International Space Youth Association (ISYA) have officially been selected to join the European Space Agency's (ESA) Young Graduate Traineeship (YGT) program. This prestigious initiative offers high-caliber university graduates a unique, hands-on experience in space science and engineering.",
      "The trainees will be stationed across key European Space Research and Technology Centre (ESTEC) facilities in the Netherlands, Darmstadt, and Frascati. Their research will span a diverse collection of projects, including CubeSat communications networks, orbital decay simulation models, and next-generation spectral imaging technologies.",
      "This announcement represents a significant milestone in ISYA's mission to bridge the gap between academic space enthusiast clubs and professional space operations agencies. Congratulations to all selected trainees! Their hard work in near-space telemetry during our annual workshops has prepared them to make a tangible contribution to the global scientific community.",
    ]
  },
  2: {
    title: "Exoplanet Discovery Methods: A Youth Astronomer's Complete Guide",
    date: "2026-05-10",
    author: "CADET_OSEI_D",
    tag: "RESEARCH",
    tagColor: "#3B82F6",
    readTime: "8 MIN",
    image: "https://images.unsplash.com/photo-1706562018605-909733434781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    body: [
      "How do we detect alien worlds orbiting stars trillions of miles away? While exoplanets are too distant to be resolved directly by standard telescopes, astronomers use several indirect observation techniques to discover thousands of planetary bodies.",
      "The most successful detection method to date is Transit Photometry. By measuring the dimming of a star as a planet crosses in front of its disk, telescopes like Kepler and TESS can estimate a planet's size, orbital period, and distance from its host star.",
      "Another fundamental method is Radial Velocity, which measures small wobbles in a star's spectral signatures caused by the gravitational pull of an orbiting exoplanet. By combining transit and radial velocity datasets, astrophysicists can calculate both the mass and radius of the planet, revealing its density and chemical composition.",
    ]
  },
  3: {
    title: "Annual Space Symposium 2026 — Registration Now Open",
    date: "2026-05-06",
    author: "ISYA_COMMAND",
    tag: "EVENT",
    tagColor: "#EC4899",
    readTime: "3 MIN",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    body: [
      "We are thrilled to announce that registration is officially open for the Annual ISYA Space Symposium 2026, set to take place in Nairobi, Kenya, from August 12th to August 16th. The event will bring together over 500 young space advocates, researchers, and professional astronauts.",
      "This year's theme, 'Decentralizing the Cosmos,' focuses on empowering global South space starts and student-led CubeSat operations. Keynote speakers include flight directors from major international agencies, astrobiology researchers, and CubeSat mission managers.",
      "Priority registration closes on June 30th. Funding grants are available to cover travel expenses for cadets presenting research papers. Submit your abstracts via our mission portal as soon as possible!",
    ]
  }
};

const DEFAULT_COMMENTS: Comment[] = [
  { id: 1, author: "Sarah Chen", avatar: "SC", time: "3 days ago", text: "This is a huge opportunity! Congrats to everyone selected for YGT. See you all in ESTEC!" },
  { id: 2, author: "Yuki Tanaka", avatar: "YT", time: "2 days ago", text: "Excellent write-up! I've been testing the budget radio receivers for solar cycle updates, very relevant." },
];

export function BlogPostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const post = POST_CONTENTS[postId];

  const [comments, setComments] = useState<Comment[]>(DEFAULT_COMMENTS);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-[#0B0F19]">
        <h2 className="text-white text-xl font-bold font-mono mb-4">// POST_NOT_FOUND_IN_ARCHIVES</h2>
        <p className="text-gray-500 mb-6">The requested transmission logs do not exist or have expired.</p>
        <Link to="/blog" className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-pink-500/20 border border-pink-500/40">
          ← BACK_TO_ARCHIVES
        </Link>
      </div>
    );
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: "Guest Cadet",
      avatar: getInitials("Guest Cadet"),
      time: "Just now",
      text: commentText.trim(),
    };

    setComments([...comments, newComment]);
    setCommentText("");
    toast.success("Comment posted to logs!");
  };

  return (
    <div className="stardust bg-[#0B0F19] min-h-screen text-gray-300">
      <div className="max-w-4xl mx-auto px-4 py-10">
        
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 mb-8 font-mono text-xs text-pink-500 hover:text-pink-400 transition-colors"
        >
          <ArrowLeft size={16} />
          BACK_TO_ARCHIVES
        </Link>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="space-y-3">
            <span
              className="font-mono px-2.5 py-1 rounded text-xs font-bold tracking-wider"
              style={{ background: `${post.tagColor}18`, color: post.tagColor, border: `1px solid ${post.tagColor}35` }}
            >
              {post.tag}
            </span>
            <h1 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs font-mono pt-2">
              <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span>BY_{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime} READ</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Body Content */}
          <div className="text-gray-300 text-sm leading-relaxed space-y-6 pt-4 font-sans max-w-none">
            {post.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Likes Interaction */}
          <div className="flex items-center gap-4 py-6 border-y border-white/5 mt-10">
            <button
              onClick={() => {
                setLiked(!liked);
                toast.success(liked ? "Transmission unliked" : "Transmission bookmarked!");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                liked 
                  ? "bg-pink-500/10 text-pink-500 border-pink-500/30" 
                  : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10"
              }`}
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} />
              {liked ? "LIKED" : "LIKE_TRANSMISSION"}
            </button>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center gap-2 text-white font-mono text-xs tracking-wider">
            <MessageSquare size={16} className="text-pink-500" />
            COMMENTS_LOGGER ({comments.length}_PACKETS)
          </div>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="flex gap-3">
            <input
              type="text"
              placeholder="Write a response log..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-gray-950/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-pink-500/50 transition-colors"
            />
            <button
              type="submit"
              className="p-3 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors cursor-pointer"
              aria-label="Send comment"
            >
              <Send size={16} />
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white shrink-0 font-mono">
                  {c.avatar}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-xs">{c.author}</span>
                    <span className="text-gray-500 text-[10px] font-mono">{c.time}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
