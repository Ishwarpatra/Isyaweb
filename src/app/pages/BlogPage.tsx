import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { format, parseISO } from "date-fns";


const OBS1 = "https://images.unsplash.com/photo-1727034394040-0377258a5791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlc2NvcGUlMjBvYnNlcnZhdG9yeSUyMG5pZ2h0JTIwc2t5JTIwc3RhcnN8ZW58MXx8fHwxNzc5MTIxMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const OBS2 = "https://images.unsplash.com/photo-1727034393564-dc7b0275686d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZWxlc2NvcGUlMjBvYnNlcnZhdG9yeSUyMG5pZ2h0JTIwc2t5JTIwc3RhcnN8ZW58MXx8fHwxNzc5MTIxMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const NEBULA = "https://images.unsplash.com/photo-1706562018605-909733434781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const GALAXY = "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const MILKY = "https://images.unsplash.com/photo-1476156863127-a8f1e9dba2b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzcGFjZSUyMGdhbGF4eSUyMGNvc21vcyUyMGRhcmslMjBuZWJ1bGF8ZW58MXx8fHwxNzc5MTIxMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const ROCKET = "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxyb2NrZXQlMjBsYXVuY2glMjBzcGFjZSUyMGV4cGxvcmF0aW9ufGVufDF8fHx8MTc3OTEyMTE2MHww&ixlib=rb-4.1.0&q=80&w=1080";
const TELESCOPE = "https://images.unsplash.com/photo-1725034898440-709aa7291bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx0ZWxlc2NvcGUlMjBvYnNlcnZhdG9yeSUyMG5pZ2h0JTIwc2t5JTIwc3RhcnN8ZW58MXx8fHwxNzc5MTIxMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080";

const CATEGORIES = ["ALL", "MISSION_UPDATE", "RESEARCH", "EVENT", "EDUCATION", "COMMUNITY"];

const ALL_POSTS = [
  { id: 1, tag: "MISSION_UPDATE", tagColor: "#F97316", title: "ISYA Members Join ESA's Young Graduate Traineeship Program", excerpt: "Fifteen ISYA cadets have been selected for ESA's prestigious traineeship, gaining hands-on experience at facilities across Europe.", date: "2026-05-14", author: "CADET_CHEN_S", readTime: "4 MIN", image: OBS1, featured: true },
  { id: 2, tag: "RESEARCH",       tagColor: "#3B82F6", title: "Exoplanet Discovery Methods: A Youth Astronomer's Complete Guide", excerpt: "From transit photometry to radial velocity — a comprehensive breakdown of techniques used to find worlds beyond our solar system.", date: "2026-05-10", author: "CADET_OSEI_D", readTime: "8 MIN", image: NEBULA, featured: false },
  { id: 3, tag: "EVENT",          tagColor: "#EC4899", title: "Annual Space Symposium 2026 — Registration Now Open", excerpt: "Join 500+ young scientists in Nairobi for the ISYA Annual Symposium. Apply before June 30 for priority access.", date: "2026-05-06", author: "ISYA_COMMAND", readTime: "3 MIN", image: GALAXY, featured: false },
  { id: 4, tag: "EDUCATION",      tagColor: "#10B981", title: "Getting Started with Radio Astronomy on a Budget", excerpt: "Build a functioning radio telescope receiver for under $200. Step-by-step guide from hardware assembly to first signal capture.", date: "2026-05-03", author: "CADET_TANAKA_Y", readTime: "10 MIN", image: TELESCOPE, featured: false },
  { id: 5, tag: "COMMUNITY",      tagColor: "#9CA3AF", title: "Meet the ISYA Cohort: Stories from Six Continents", excerpt: "From Chile to China, meet the diverse cadets driving ISYA's newest wave of space initiatives in 2026.", date: "2026-04-28", author: "CADET_DIALLO_A", readTime: "6 MIN", image: MILKY, featured: false },
  { id: 6, tag: "MISSION_UPDATE", tagColor: "#F97316", title: "ISYA CubeSat Project Receives IAF Funding Grant", excerpt: "Our student-led CubeSat team has secured IAF funding to continue ionosphere research — a major milestone.", date: "2026-04-22", author: "ENG_TEAM_ALPHA", readTime: "5 MIN", image: ROCKET, featured: false },
  { id: 7, tag: "RESEARCH",       tagColor: "#3B82F6", title: "Understanding Solar Cycles and Space Weather", excerpt: "A deep dive into how solar activity affects satellite communications, aurora visibility, and near-Earth orbital mechanics.", date: "2026-04-15", author: "CADET_REYES_L", readTime: "7 MIN", image: OBS2, featured: false },
];

const POSTS_PER_PAGE = 6;

export function BlogPage() {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = ALL_POSTS.filter((p) => {
    const matchCat = activeCategory === "ALL" || p.tag === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((p) => p.featured);
  const grid = filtered.filter((p) => !p.featured);
  const totalPages = Math.ceil(grid.length / POSTS_PER_PAGE);
  const paginated = grid.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div ref={sectionRef} className="stardust bg-[#0B0F19] min-h-screen">
      {/* ── Sticky search + filter bar ── */}
      <div className="sticky top-16 z-30 bg-[#05080F]/90 backdrop-blur-xl border-b border-pink-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Terminal search */}
          <div className="relative flex items-center min-w-[240px] w-full sm:w-auto">
            <Search size={14} className="absolute left-3 text-pink-500" />
            <input
              type="text"
              placeholder="QUERY_ARCHIVES_ |"
              aria-label="Search archives"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 font-mono text-[0.72rem] tracking-wider text-white bg-gray-900/60 border border-pink-500/20 rounded-lg outline-none focus:border-pink-500/50 transition-colors"
            />
          </div>
          {/* Toggle filters */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-md font-mono text-xs tracking-widest transition-all ${
                  activeCategory === cat 
                    ? "bg-pink-500/20 text-pink-500 border border-pink-500/40 font-bold" 
                    : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"
                }`}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="mb-10 reveal">
          <p className="font-mono text-pink-500 text-xs tracking-telemetry-wide mb-2">
            // DATA_ARCHIVES :: SECTOR_7G :: {filtered.length}_RECORDS_FOUND
          </p>
          <h1 className="text-white text-4xl text-[clamp(2rem,5vw,3rem)] font-bold leading-tight">
            The Data Archives
          </h1>
        </div>

        {/* Featured article */}
        {featured && (
          <Link
            to={`/blog/${featured.id}`}
            className="block rounded-xl overflow-hidden mb-10 group glass-card hud-corners border border-pink-500/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto min-h-[280px] overflow-hidden">
                <ImageWithFallback
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute top-3 left-3">
                  <span className="font-mono px-2 py-1 rounded bg-orange-500/90 text-black text-xs font-bold tracking-wider">
                    ★ FEATURED_TRANSMISSION
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#05080F]/90 backdrop-blur-md">
                  <p className="font-mono text-pink-500 text-xs tracking-wider">
                    // SECTOR_READ_TIME: {featured.readTime} | AUTH_LEVEL: PUBLIC
                  </p>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="font-mono inline-block px-2 py-1 rounded mb-4 self-start text-orange-500 text-xs tracking-wider bg-orange-500/10 border border-orange-500/20">
                  {featured.tag}
                </span>
                <h2 className="text-white text-2xl font-bold leading-tight mb-4 group-hover:text-pink-500 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3 font-mono text-gray-500 text-xs tracking-wider">
                  <span>{format(parseISO(featured.date), 'LLL dd, yyyy').toUpperCase()}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span className="flex items-center gap-0.5">
                    <span className="sr-only">By {featured.author.replace(/_/g, " ")}</span>
                    <span aria-hidden="true" className="before:content-['BY_'] before:text-gray-500">
                      {featured.author.replace(/_/g, " ")}
                    </span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>{featured.readTime} READ</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {paginated.length > 0 ? (
            paginated.map((post, idx) => (
              <li key={post.id}>
                <Link
                  to={`/blog/${post.id}`}
                  className={`flex flex-col rounded-xl overflow-hidden group glass-card hud-corners border border-white/5 reveal reveal-delay-${Math.min(idx + 1, 6)} h-full`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono px-2 py-0.5 rounded text-xs tracking-wider backdrop-blur-md" style={{ background: `${post.tagColor}25`, color: post.tagColor, border: `1px solid ${post.tagColor}40` }}>
                        {post.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#05080F]/90 backdrop-blur-md">
                      <p className="font-mono text-pink-500 text-[0.56rem] tracking-wider">
                        // READ_TIME: {post.readTime} | AUTH_LEVEL: PUBLIC
                      </p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-white text-[0.925rem] font-semibold leading-relaxed mb-3 group-hover:text-pink-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-[0.8rem] leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 font-mono text-gray-500 text-xs tracking-wider">
                      <span>{format(parseISO(post.date), 'LLL dd, yyyy').toUpperCase()}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-700" aria-hidden="true" />
                      <span className="flex items-center gap-0.5">
                        <span className="sr-only">By {post.author.replace(/_/g, " ")}</span>
                        <span aria-hidden="true" className="before:content-['BY_'] before:text-gray-500">
                          {post.author.replace(/_/g, " ")}
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="col-span-full py-20 text-center">
              <p className="font-mono text-gray-500 text-sm tracking-widest">
                [!] NO_RECORDS_MATCH_YOUR_QUERY_ |
              </p>
            </li>
          )}
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 disabled:opacity-20 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`w-10 h-10 rounded-lg font-mono text-xs transition-all ${
                  currentPage === page 
                    ? "bg-pink-500/20 text-pink-500 border border-pink-500/40 font-bold" 
                    : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 disabled:opacity-20 hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
