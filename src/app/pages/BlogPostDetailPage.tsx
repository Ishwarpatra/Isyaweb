import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, MessageSquare, Clock, Calendar, Send, Heart, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getInitials } from "./CommunityPage";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { mockDb, BlogPost, BlogComment } from "../utils/mockDb";
import { useAuth } from "../hooks/useAuth";

// Simple inline markdown compiler for bold, italic, code chunks, and external links
function parseMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index} className="italic text-gray-200">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-pink-400 text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 underline transition-colors">
            {match[1]}
          </a>
        );
      }
    }
    return part;
  });
}

export function BlogPostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const { user } = useAuth();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Visual posting feedback states
  const [submittingComment, setSubmittingComment] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  // Load post, comments, and related category blogs on mount
  useEffect(() => {
    try {
      const fetchedPost = mockDb.getBlogById(postId);
      if (fetchedPost) {
        setPost(fetchedPost);
        setComments(mockDb.getBlogComments(postId));

        // Filter for related posts (matching tag category, excluding current post, max 2 items)
        const allBlogs = mockDb.getBlogs();
        const related = allBlogs
          .filter(b => b.id !== postId && b.tag === fetchedPost.tag)
          .slice(0, 2);
        setRelatedPosts(related);
      }
    } catch (e) {
      console.error("Failed to retrieve blog post details:", e);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (commentText.length > 500) {
      toast.error("Comment exceeds the maximum character limit (500).");
      return;
    }

    setSubmittingComment(true);

    // Simulate network telemetry latency
    setTimeout(() => {
      try {
        const authorName = user ? user.name : "Guest Cadet";
        const avatarInitials = getInitials(authorName);
        
        const newComment = mockDb.addBlogComment({
          postId,
          author: authorName,
          avatar: avatarInitials,
          time: "Just now",
          text: commentText.trim(),
        });

        setComments((prev) => [...prev, newComment]);
        setCommentText("");
        toast.success("Comment posted to logs!");
      } catch (err: any) {
        toast.error(err.message || "Failed to submit comment.");
      } finally {
        setSubmittingComment(false);
      }
    }, 450);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-[#0B0F19]">
        <div className="animate-pulse text-pink-500 font-mono text-xs">// RETRIEVING_DATA_LINK_...</div>
      </div>
    );
  }

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
              <span className="flex items-center gap-1"><Calendar size={13} /> {format(parseISO(post.date), 'LLL dd, yyyy').toUpperCase()}</span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="flex items-center gap-0.5">
                <span className="sr-only">By {post.author.replace(/_/g, " ")}</span>
                <span aria-hidden="true" className="before:content-['BY_'] before:text-gray-500">
                  {post.author.replace(/_/g, " ")}
                </span>
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime} READ</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Body Content with dynamic Markdown parsing */}
          <div className="text-gray-300 text-sm leading-relaxed space-y-6 pt-4 font-sans max-w-none">
            {post.body.map((p, idx) => (
              <p key={idx}>{parseMarkdown(p)}</p>
            ))}
          </div>

          {/* Likes Interaction */}
          <div className="flex items-center gap-4 py-6 border-y border-white/5 mt-10">
            <button
              onClick={() => {
                setLiked(!liked);
                toast.success(liked ? "Transmission unliked" : "Transmission bookmarked!");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer bg-white/5 text-gray-400 border-white/5 hover:bg-white/10"
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} className={liked ? "text-pink-500" : ""} />
              {liked ? "LIKED" : "LIKE_TRANSMISSION"}
            </button>
          </div>
        </article>

        {/* Related Transmissions Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-10 border-t border-white/5">
            <h3 className="font-mono text-xs text-white tracking-[0.2em] mb-6">// RELATED_TRANSMISSIONS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.id}`}
                  className="group block p-5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-pink-500/20 transition-all duration-300"
                >
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded" style={{ background: `${related.tagColor}15`, color: related.tagColor }}>
                    {related.tag}
                  </span>
                  <h4 className="text-white text-sm font-semibold tracking-wide mt-3 group-hover:text-pink-400 transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {related.excerpt}
                  </p>
                  <div className="flex items-center gap-2 font-mono text-[9px] text-gray-500 mt-4">
                    <span>{related.date}</span>
                    <span>•</span>
                    <span>{related.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center gap-2 text-white font-mono text-xs tracking-wider">
            <MessageSquare size={16} className="text-pink-500" />
            COMMENTS_LOGGER ({comments.length}_PACKETS)
          </div>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="flex flex-col gap-2">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Write a response log (max 500 characters)..."
                maxLength={500}
                disabled={submittingComment}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-gray-950/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-pink-500/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submittingComment || !commentText.trim()}
                className="p-3 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-colors cursor-pointer flex items-center justify-center shrink-0 min-w-11 min-h-11"
                aria-label="Send comment"
              >
                {submittingComment ? <Loader2 size={16} className="animate-spin text-pink-500" /> : <Send size={16} />}
              </button>
            </div>
            <div className="flex justify-between font-mono text-[9px] text-gray-500 px-1">
              <span>INPUT_LIMIT: 500_CHARS</span>
              <span>REMAINING: {500 - commentText.length}</span>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white shrink-0 font-mono border border-pink-500/10">
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
