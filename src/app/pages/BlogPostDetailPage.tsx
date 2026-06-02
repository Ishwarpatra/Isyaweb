import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, MessageSquare, Clock, Calendar, Send, Heart, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';

const CATEGORY_COLORS: Record<string, string> = {
  MISSION_UPDATE: '#F97316', // orange
  RESEARCH: '#3B82F6',        // blue
  EVENT: '#EC4899',           // pink
  EDUCATION: '#10B981',       // green
  COMMUNITY: '#8B5CF6',       // purple
};

interface BlogComment {
  id: number;
  content: string;
  created_at: string;
  author_id: number;
  author_name: string;
  author_role: string;
}

interface BlogPostDetail {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author_id: number;
  author_name: string;
  author_role: string;
  category: string;
  featured?: boolean;
  published_at: string;
  created_at: string;
  view_count: number;
  image?: string;
  comments: BlogComment[];
}

interface RelatedPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  published_at: string;
  created_at: string;
  image?: string;
}

function getInitials(name: string): string {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

function timeAgo(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return 'recently';
  }
}

// Simple inline markdown compiler for bold, italic, code chunks, and external links
function parseMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="italic text-gray-200">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-pink-400 text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('[') && part.includes('](')) {
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

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // Fetch individual blog post details + comments
  const { data: post, loading, error, retry } = useApi<BlogPostDetail>(`/api/blogs/${postId}`);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  // Sync comments once post data resolves
  useEffect(() => {
    if (post?.comments) {
      setComments(post.comments);
    }
  }, [post]);

  // Fetch related category blogs using useApi hook
  const { data: relatedData } = useApi<{ data: RelatedPost[] }>(
    post ? `/api/blogs?category=${post.category}&limit=3` : '',
    { skip: !post }
  );

  const relatedPosts = (relatedData?.data || [])
    .filter((b) => b.id !== postId)
    .slice(0, 2);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (commentText.length > 500) {
      toast.error('Comment exceeds the maximum character limit (500).');
      return;
    }

    setSubmittingComment(true);

    try {
      const res = await fetch(`${apiBase}/api/blogs/${postId}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit comment.');
      }

      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setCommentText('');
      toast.success('Comment posted to logs!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit comment.');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-[#0B0F19]">
        <div className="animate-pulse text-pink-500 font-mono text-xs">// RETRIEVING_DATA_LINK_...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-[#0B0F19] max-w-xl mx-auto">
        <h1 className="text-white text-xl font-bold font-mono mb-4">// POST_NOT_FOUND_IN_ARCHIVES</h1>
        <p className="text-gray-400 mb-6">{error || 'The requested transmission logs do not exist or have expired.'}</p>
        <div className="flex gap-4">
          <button onClick={retry} className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-pink-500/20 border border-pink-500/40 cursor-pointer">
            RETRY_CONNECTION
          </button>
          <Link to="/blog" className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-white/5 border border-white/10">
            ← BACK_TO_ARCHIVES
          </Link>
        </div>
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[post.category] || '#F97316';
  const readTimeMinutes = Math.ceil((post.content || '').split(/\s+/).length / 200);
  const readTimeLabel = `${readTimeMinutes} MIN`;

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
              style={{ background: `${categoryColor}18`, color: categoryColor, border: `1px solid ${categoryColor}35` }}
            >
              {post.category.replace('_', ' ')}
            </span>
            <h1 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs font-mono pt-2">
              <span className="flex items-center gap-1">
                <Calendar size={13} /> 
                {format(parseISO(post.published_at || post.created_at), 'LLL dd, yyyy').toUpperCase()}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="flex items-center gap-0.5">
                <span aria-hidden="true" className="before:content-['BY_'] before:text-gray-400">
                  {(post.author_name || 'System').toUpperCase()}
                </span>
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="flex items-center gap-1">
                <Clock size={13} /> 
                {readTimeLabel} READ
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="text-pink-500/70">{post.view_count} VIEWS</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <ImageWithFallback 
              src={post.image || 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800'} 
              alt={post.title} 
              fallbackWidth={1200}
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Body Content with dynamic Markdown parsing */}
          <div className="text-gray-300 text-sm leading-relaxed space-y-6 pt-4 font-sans max-w-none">
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{parseMarkdown(paragraph)}</p>
            ))}
          </div>

          {/* Likes Interaction */}
          <div className="flex items-center gap-4 py-6 border-y border-white/5 mt-10">
            <button
              onClick={() => {
                setLiked(!liked);
                toast.success(liked ? 'Transmission unliked' : 'Transmission bookmarked!');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer bg-white/5 text-gray-400 border-white/5 hover:bg-white/10"
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} className={liked ? 'text-pink-500' : ''} />
              {liked ? 'LIKED' : 'LIKE_TRANSMISSION'}
            </button>
          </div>
        </article>

        {/* Related Transmissions Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-10 border-t border-white/5">
            <h3 className="font-mono text-xs text-white tracking-[0.2em] mb-6">// RELATED_TRANSMISSIONS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => {
                const relColor = CATEGORY_COLORS[related.category] || '#F97316';
                const relReadTime = `${Math.ceil((related.content || '').split(/\s+/).length / 200)} MIN`;
                return (
                  <Link
                    key={related.id}
                    to={`/blog/${related.id}`}
                    className="group block p-5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-pink-500/20 transition-all duration-300"
                  >
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded" style={{ background: `${relColor}15`, color: relColor }}>
                      {related.category.replace('_', ' ')}
                    </span>
                    <h4 className="text-white text-sm font-semibold tracking-wide mt-3 group-hover:text-pink-400 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-2 font-mono text-[9px] text-gray-500 mt-4">
                      <span>{format(parseISO(related.published_at || related.created_at), 'LLL dd, yyyy').toUpperCase()}</span>
                      <span>•</span>
                      <span>{relReadTime}</span>
                    </div>
                  </Link>
                );
              })}
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
                placeholder={user ? "Write a response log (max 500 characters)..." : "Sign in to post a response log..."}
                maxLength={500}
                disabled={submittingComment || !user}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-gray-950/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-pink-500/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submittingComment || !commentText.trim() || !user}
                className="p-3 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-colors cursor-pointer flex items-center justify-center shrink-0 min-w-11 min-h-11"
                aria-label="Send comment"
              >
                {submittingComment ? <Loader2 size={16} className="animate-spin text-pink-500" /> : <Send size={16} />}
              </button>
            </div>
            {user ? (
              <div className="flex justify-between font-mono text-[9px] text-gray-500 px-1">
                <span>INPUT_LIMIT: 500_CHARS</span>
                <span>REMAINING: {500 - commentText.length}</span>
              </div>
            ) : (
              <div className="font-mono text-[9px] text-pink-500 px-1">
                // AUTHENTICATION_REQUIRED_TO_LOG_MESSAGES
              </div>
            )}
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white shrink-0 font-mono border border-pink-500/10">
                  {getInitials(c.author_name)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-xs">{c.author_name}</span>
                    <span className="text-gray-500 text-[10px] font-mono">{timeAgo(c.created_at)}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
