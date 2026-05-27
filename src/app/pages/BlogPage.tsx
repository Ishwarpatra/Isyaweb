import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Search, X, Satellite } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { format, parseISO } from "date-fns";
import { mockDb, BlogPost } from "../utils/mockDb";

const CATEGORIES = ["ALL", "MISSION_UPDATE", "RESEARCH", "EVENT", "EDUCATION", "COMMUNITY"];
const POSTS_PER_PAGE = 6;

export function BlogPage() {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  // ── State (server-ready shape) ──
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFound, setTotalFound] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // ── Debounce: wait 350ms after last keystroke before filtering ──
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // ── Reset page when category changes ──
  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  }, []);

  // ── Simulated API fetch (swap setTimeout for real fetch / react-query later) ──
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const allData = mockDb.getBlogs();

      const filtered = allData.filter((p) => {
        const matchCat = activeCategory === "ALL" || p.tag === activeCategory;
        const q = debouncedSearch.toLowerCase();
        const matchSearch =
          q === "" ||
          p.title.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q);
        return matchCat && matchSearch;
      });

      const featured = filtered.find((p) => p.featured) ?? null;
      const grid = filtered.filter((p) => !p.featured);

      setTotalFound(filtered.length);
      setTotalPages(Math.max(1, Math.ceil(grid.length / POSTS_PER_PAGE)));
      setPosts(grid.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE));
      setFeaturedPost(currentPage === 1 ? featured : null);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [debouncedSearch, activeCategory, currentPage]);

  const clearSearch = () => {
    setSearchQuery("");
    setActiveCategory("ALL");
    setCurrentPage(1);
  };

  return (
    <div ref={sectionRef} className="stardust bg-[#0B0F19] min-h-screen">

      {/* ── Sticky search + filter bar ── */}
      <div className="sticky top-16 z-30 bg-[#05080F]/90 backdrop-blur-xl border-b border-pink-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">

          {/* Terminal search with blinking caret + clear button */}
          <div
            className={`terminal-input-wrapper relative flex items-center min-w-[240px] w-full sm:w-auto group${searchQuery ? " has-text" : ""}`}
          >
            <Search
              size={15}
              className="absolute left-3 text-pink-500 z-10 transition-transform group-focus-within:scale-110"
            />
            <input
              id="blog-search"
              type="search"
              placeholder="QUERY_ARCHIVES_ |"
              aria-label="Search the Data Archives"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              /* WCAG FIX: text-xs = 14px, above the 12px minimum */
              className="w-full pl-10 pr-10 py-2 font-mono text-xs tracking-wider text-white bg-gray-900/60 border border-pink-500/20 rounded-lg outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all input-glow"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2 p-1.5 text-gray-400 hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Sci-fi category tabs */}
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => handleCategoryChange(cat)}
                className={`tab-scifi px-3 py-1.5 font-mono text-xs tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-1 focus-visible:ring-offset-[#05080F] ${
                  activeCategory === cat
                    ? "bg-pink-500/20 text-pink-500 border border-pink-500/40 font-bold"
                    : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Page Header ── */}
        <div className="mb-10 reveal">
          <p className="font-mono text-pink-500 text-xs tracking-telemetry-wide mb-2">
            // DATA_ARCHIVES :: SECTOR_7G
            {!isLoading && (
              <span className="ml-2 text-gray-500">
                :: {totalFound}_RECORDS_FOUND
              </span>
            )}
          </p>
          <h1 className="text-white font-bold leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            The Data Archives
          </h1>
        </div>

        {/* ── Loading state ── */}
        {isLoading ? (
          <div className="py-32 text-center">
            <div className="inline-flex items-center gap-3 font-mono text-pink-500 text-sm animate-pulse">
              <Satellite size={18} className="animate-spin" style={{ animationDuration: "2s" }} />
              // ESTABLISHING_DATALINK...
            </div>
          </div>
        ) : (
          <>
            {/* ── Featured Article ── */}
            {featuredPost && (
              <article className="rounded-xl overflow-hidden mb-10 group glass-card hud-corners border border-pink-500/10 post-card cosmic-dust-card reveal">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Image — visor-reflect + data-scan effect */}
                  <div className="relative min-h-[300px] h-full overflow-hidden visor-reflect data-scan">
                    <ImageWithFallback
                      src={featuredPost.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="font-mono px-3 py-1.5 rounded bg-orange-500/90 text-black text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                        ★ FEATURED_TRANSMISSION
                      </span>
                    </div>
                    {/* Always-visible read time overlay at bottom */}
                    <div className="absolute bottom-0 inset-x-0 px-4 py-2.5 bg-gradient-to-t from-black/80 to-transparent z-10">
                      <p className="font-mono text-pink-400 text-xs tracking-wider">
                        // SECTOR_READ_TIME: {featuredPost.readTime} | AUTH_LEVEL: PUBLIC
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center relative z-10">
                    <span className="font-mono inline-block px-3 py-1.5 rounded mb-4 self-start text-orange-500 text-xs tracking-wider bg-orange-500/10 border border-orange-500/20">
                      {featuredPost.tag}
                    </span>
                    {/* SEMANTIC FIX: Link wraps title only, post-card-link pseudo covers full card */}
                    <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-4">
                      <Link
                        to={`/blog/${featuredPost.id}`}
                        className="post-card-link group-hover:text-pink-400 transition-colors focus-visible:outline-none focus-visible:underline"
                      >
                        {featuredPost.title}
                      </Link>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono mt-auto">
                      <span className="text-gray-500 text-xs tracking-wider">
                        {format(parseISO(featuredPost.date), "LLL dd, yyyy").toUpperCase()}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-700" aria-hidden="true" />
                      <span className="text-gray-500 text-xs tracking-wider">
                        <span className="sr-only">By </span>
                        BY_{featuredPost.author.replace(/ /g, "_")}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-700" aria-hidden="true" />
                      <span className="text-pink-500/80 text-xs tracking-wider">
                        {featuredPost.readTime}_READ
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* ── Article Grid ── */}
            <ul
              role="list"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {posts.length > 0 ? (
                posts.map((post, idx) => (
                  <li key={post.id}>
                    {/* SEMANTIC FIX: <article> + .post-card, Link only on title */}
                    <article
                      className={`flex flex-col rounded-xl overflow-hidden group glass-card hud-corners border border-white/5 h-full post-card zero-g-hover reveal reveal-delay-${Math.min(idx + 1, 6)}`}
                    >
                      {/* Thumbnail: data-scan laser on hover */}
                      <div className="relative aspect-[16/10] overflow-hidden data-scan visor-reflect">
                        <ImageWithFallback
                          src={post.image}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 z-20">
                          <span
                            className="font-mono px-2 py-1 rounded text-xs tracking-wider backdrop-blur-md"
                            style={{
                              background: `${post.tagColor}22`,
                              color: post.tagColor,
                              border: `1px solid ${post.tagColor}44`,
                            }}
                          >
                            {post.tag}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        {/* WCAG FIX: text-base / text-sm — no sub-12px sizes */}
                        <h3 className="text-white text-base font-semibold leading-snug mb-2 line-clamp-2">
                          <Link
                            to={`/blog/${post.id}`}
                            className="post-card-link group-hover:text-pink-400 transition-colors focus-visible:outline-none focus-visible:underline"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* MOBILE FIX: metadata always visible, not hidden behind hover */}
                        <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-1.5">
                          <div className="flex items-center justify-between font-mono text-xs tracking-wider">
                            <span className="text-gray-500">
                              {format(parseISO(post.date), "LLL dd, yyyy").toUpperCase()}
                            </span>
                            <span className="text-pink-500/70">{post.readTime}_READ</span>
                          </div>
                          <span className="font-mono text-xs text-gray-500 tracking-wider">
                            <span className="sr-only">By </span>
                            BY_{post.author.replace(/ /g, "_")}
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                ))
              ) : !featuredPost ? (
                /* GLITCH EMPTY STATE with reset action */
                <li className="col-span-full">
                  <div className="py-24 flex flex-col items-center justify-center">
                    <div className="p-10 rounded-2xl border border-pink-500/20 bg-pink-500/5 max-w-md w-full text-center hud-corners">
                      <Search size={32} className="mx-auto text-pink-500/40 mb-5" />
                      <p
                        className="text-glitch font-mono text-pink-500 text-sm tracking-widest mb-3"
                        data-text="[!] NO_RECORDS_MATCH_YOUR_QUERY"
                      >
                        [!] NO_RECORDS_MATCH_YOUR_QUERY
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Adjust your search parameters and rescan the sector.
                      </p>
                      <button
                        onClick={clearSearch}
                        className="px-5 py-2.5 bg-pink-500/10 text-pink-500 border border-pink-500/30 rounded-lg font-mono text-xs tracking-widest hover:bg-pink-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                      >
                        RESET_ALL_FILTERS
                      </button>
                    </div>
                  </div>
                </li>
              ) : null}
            </ul>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <nav
                className="flex items-center justify-center gap-2"
                aria-label="Pagination navigation"
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 disabled:opacity-20 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    aria-label={`Page ${page}`}
                    className={`w-10 h-10 rounded-lg font-mono text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                      currentPage === page
                        ? "bg-pink-500/20 text-pink-500 border border-pink-500/40 font-bold shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 disabled:opacity-20 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
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
