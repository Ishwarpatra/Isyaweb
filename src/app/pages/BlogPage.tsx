import React, { useState } from 'react';
import { Link } from 'react-router';
import { useApi } from '../hooks/useApi';
import { ChevronLeft, ChevronRight, Search, X, Satellite } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { format, parseISO } from 'date-fns';

const CATEGORIES = ['ALL', 'MISSION_UPDATE', 'RESEARCH', 'EVENT', 'EDUCATION', 'COMMUNITY'];
const POSTS_PER_PAGE = 6;

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author_id: number;
  author_name: string;
  author_role: string;
  category: string;
  featured?: boolean;
  published_at: string;
  created_at: string;
  view_count: number;
  image?: string;
  tag?: string;
  tagColor?: string;
  readTime?: string;
}

export function BlogPage() {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Build query string
  const queryParams = new URLSearchParams({
    page: String(currentPage),
    limit: String(POSTS_PER_PAGE),
    ...(activeCategory !== 'ALL' && { category: activeCategory }),
    ...(searchQuery && { search: searchQuery }),
  }).toString();

  const { data, loading, error, retry } = useApi<{
    data: BlogPost[];
    pagination: { page: number; limit: number; total: number; pages: number };
  }>(`/api/blogs?${queryParams}`);

  const posts = data?.data || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.pages || 1;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setActiveCategory('ALL');
    setCurrentPage(1);
  };

  return (
    <div ref={sectionRef} className="stardust bg-[#0B0F19] min-h-screen">
      {/* Sticky search + filter bar */}
      <div className="sticky top-16 z-30 bg-[#05080F]/90 backdrop-blur-xl border-b border-pink-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Terminal search */}
          <div className="relative flex items-center min-w-[240px] w-full sm:w-auto group">
            <Search size={15} className="absolute left-3 text-pink-500 z-10" />
            <input
              id="blog-search"
              type="search"
              placeholder="QUERY_ARCHIVES_ |"
              aria-label="Search the Data Archives"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-10 py-2 font-mono text-xs tracking-wider text-white bg-gray-900/60 border border-pink-500/20 rounded-lg outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                aria-label="Clear search"
                className="absolute right-2 p-1.5 text-gray-400 hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => handleCategoryChange(cat)}
                className={`tab-scifi px-3 py-1.5 font-mono text-xs tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                  activeCategory === cat
                    ? 'bg-pink-500/20 text-pink-500 border border-pink-500/40 font-bold'
                    : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Page Header */}
        <div className="mb-10 reveal">
          <p className="font-mono text-pink-500 text-xs tracking-telemetry-wide mb-2">
            // DATA_ARCHIVES :: SECTOR_7G
            {!loading && pagination && (
              <span className="ml-2 text-gray-500">
                :: {pagination.total}_RECORDS_FOUND
              </span>
            )}
          </p>
          <h1 className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            The Data Archives
          </h1>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-32 text-center">
            <div className="inline-flex items-center gap-3 font-mono text-pink-500 text-sm animate-pulse">
              <Satellite size={18} className="animate-spin" style={{ animationDuration: '2s' }} />
              // ESTABLISHING_DATALINK...
            </div>
          </div>
        ) : error ? (
          <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 text-center max-w-xl mx-auto">
            <p className="text-glitch font-mono text-red-500 text-xs mb-3 data-text='// ERR_TRANSMISSION_FAILURE'">
              // ERR_TRANSMISSION_FAILURE
            </p>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{error}</p>
            <button
              onClick={retry}
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-red-500/20 border border-red-500/40 hover:bg-red-500/35 transition-colors cursor-pointer"
            >
              RETRY_CONNECTION_BUFFER
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-10 rounded-2xl border border-brand-pink/10 bg-brand-pink/[0.03] text-center max-w-xl mx-auto flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-600" aria-hidden="true" />
              <span className="absolute inset-0 rounded-full border-2 border-gray-700 animate-ping opacity-20" />
            </div>
            <p className="font-mono text-brand-pink text-xs tracking-wider">// BUFFER_EMPTY</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              No telemetry transmissions match your query. Try adjusting filters or search terms.
            </p>
            <button
              onClick={clearSearch}
              className="mt-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-brand-pink/20 border border-brand-pink/40 hover:bg-brand-pink/30 transition-colors cursor-pointer"
            >
              RESET_SECTOR
            </button>
          </div>
        ) : (
          <>
            {/* Article Grid */}
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post, idx) => (
                <li key={post.id}>
                  <article className={`post-card group flex flex-col rounded-xl overflow-hidden glass-card hud-corners border border-white/5 h-full zero-g-hover reveal reveal-delay-${Math.min(idx + 1, 3)} relative`}>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden data-scan visor-reflect">
                      <ImageWithFallback
                        src={post.image || 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400'}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        fallbackWidth={600}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus-within:scale-110"
                      />
                      <div className="absolute top-3 left-3 z-20">
                        <span className="font-mono px-2 py-1 rounded text-xs tracking-wider backdrop-blur-md bg-pink-500/20 text-pink-400 border border-pink-500/40">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="text-white text-base font-semibold leading-snug mb-2 line-clamp-2">
                        <Link
                          to={`/blog/${post.id}`}
                          className="post-card-link group-hover:text-pink-400 transition-colors focus-visible:outline-none focus-visible:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt || post.content.substring(0, 100) + '...'}
                      </p>

                      {/* Metadata */}
                      <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between font-mono text-xs tracking-wider">
                          <span className="text-gray-500">
                            {format(parseISO(post.published_at || post.created_at), 'LLL dd, yyyy').toUpperCase()}
                          </span>
                          <span className="text-pink-500/70">{post.view_count} VIEWS</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2" aria-label="Pagination navigation">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 disabled:opacity-20 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
                    aria-label={`Page ${page}`}
                    className={`w-10 h-10 rounded-lg font-mono text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                      currentPage === page
                        ? 'bg-pink-500/20 text-pink-500 border border-pink-500/40 font-bold shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 disabled:opacity-20 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
