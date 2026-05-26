import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollReveal } from "../hooks/useScrollReveal";

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
  const sectionRef = useScrollReveal();
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
    <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="stardust" style={{ background: "#0B0F19", minHeight: "100vh" }}>
      {/* ── Sticky search + filter bar ── */}
      <div
        className="sticky top-16 z-30"
        style={{ background: "rgba(5,8,15,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(236,72,153,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Terminal search */}
          <div className="relative flex items-center min-w-[240px]">
            <span className="absolute left-3 font-mono" style={{ color: "#EC4899", fontSize: "0.75rem" }}>{">"}</span>
            <input
              type="text"
              placeholder="QUERY_ARCHIVES_ |"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-7 pr-4 py-2 font-mono outline-none"
              style={{
                background: "rgba(17,24,39,0.6)",
                border: "1px solid rgba(236,72,153,0.2)",
                borderRadius: 8,
                color: "#fff",
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
              }}
            />
          </div>
          {/* Toggle filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className="font-mono btn-press"
                style={{
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  background: activeCategory === cat ? "rgba(236,72,153,0.2)" : "rgba(255,255,255,0.04)",
                  color: activeCategory === cat ? "#EC4899" : "#9CA3AF",
                  border: `1px solid ${activeCategory === cat ? "rgba(236,72,153,0.4)" : "rgba(255,255,255,0.06)"}`,
                  fontWeight: activeCategory === cat ? 700 : 400,
                  transition: "all 200ms ease",
                }}
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
          <p className="font-mono mb-2" style={{ color: "#EC4899", fontSize: "0.65rem", letterSpacing: "0.16em" }}>
            // DATA_ARCHIVES :: SECTOR_7G :: {filtered.length}_RECORDS_FOUND
          </p>
          <h1 className="text-white" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>
            The Data Archives
          </h1>
        </div>

        {/* Featured article */}
        {featured && (
          <article
            className="rounded-xl overflow-hidden mb-10 group cursor-pointer hud-corners glass-card"
            style={{ border: "1px solid rgba(236,72,153,0.12)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
                <ImageWithFallback
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  style={{ minHeight: 280 }}
                />
                <div className="absolute top-3 left-3">
                  <span
                    className="font-mono px-2 py-1 rounded"
                    style={{ background: "rgba(249,115,22,0.85)", color: "#000", fontSize: "0.6rem", letterSpacing: "0.1em", fontWeight: 700 }}
                  >
                    ★ FEATURED_TRANSMISSION
                  </span>
                </div>
                {/* Data reveal */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: "rgba(5,8,15,0.93)", backdropFilter: "blur(8px)" }}
                >
                  <p className="font-mono" style={{ color: "#EC4899", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                    // SECTOR_READ_TIME: {featured.readTime} | AUTH_LEVEL: PUBLIC | CLEARANCE: OPEN
                  </p>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span
                  className="font-mono inline-block px-2 py-1 rounded mb-4 self-start"
                  style={{ background: `${featured.tagColor}18`, color: featured.tagColor, fontSize: "0.6rem", letterSpacing: "0.1em", border: `1px solid ${featured.tagColor}33` }}
                >
                  {featured.tag}
                </span>
                <h2 className="text-white mb-4" style={{ fontSize: "1.4rem", fontWeight: 700, lineHeight: 1.3 }}>
                  {featured.title}
                </h2>
                <p style={{ color: "#9CA3AF", lineHeight: 1.75, fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-2 font-mono" style={{ color: "#9CA3AF", fontSize: "0.62rem", letterSpacing: "0.08em" }}>
                  <span>{featured.date}</span>
                  <span>|</span>
                  <span>{featured.author}</span>
                  <span>|</span>
                  <span>{featured.readTime} READ</span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {paginated.map((post, idx) => (
            <article
              key={post.id}
              className={`rounded-xl overflow-hidden group cursor-pointer card-hover hud-corners reveal reveal-delay-${Math.min(idx + 1, 6)} glass-card`}
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                />
                {/* Tag over image */}
                <div className="absolute top-3 left-3">
                  <span
                    className="font-mono px-2 py-0.5 rounded"
                    style={{
                      background: `${post.tagColor}25`,
                      color: post.tagColor,
                      fontSize: "0.58rem",
                      letterSpacing: "0.1em",
                      border: `1px solid ${post.tagColor}40`,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {post.tag}
                  </span>
                </div>
                {/* Slide-up terminal data on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: "rgba(5,8,15,0.92)", backdropFilter: "blur(8px)" }}
                >
                  <p className="font-mono" style={{ color: "#EC4899", fontSize: "0.56rem", letterSpacing: "0.08em" }}>
                    // READ_TIME: {post.readTime} | AUTH_LEVEL: PUBLIC
                  </p>
                </div>
              </div>
              <div className="p-5">
                <h3
                  className="text-white mb-2"
                  style={{
                    fontSize: "0.925rem", fontWeight: 600, lineHeight: 1.4,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ color: "#9CA3AF", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.875rem",
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 font-mono" style={{ color: "#9CA3AF", fontSize: "0.6rem", letterSpacing: "0.06em" }}>
                  <span>{post.date}</span>
                  <span>|</span>
                  <span>{post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-lg flex items-center justify-center disabled:opacity-30 glass-card btn-press"
              style={{ color: "#9CA3AF" }}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className="w-9 h-9 rounded-lg flex items-center justify-center font-mono btn-press"
                style={{
                  background: currentPage === page ? "rgba(236,72,153,0.2)" : "rgba(17,24,39,0.5)",
                  border: `1px solid ${currentPage === page ? "rgba(236,72,153,0.5)" : "rgba(255,255,255,0.06)"}`,
                  color: currentPage === page ? "#EC4899" : "#9CA3AF",
                  fontSize: "0.75rem",
                  fontWeight: currentPage === page ? 700 : 400,
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-lg flex items-center justify-center disabled:opacity-30 glass-card btn-press"
              style={{ color: "#9CA3AF" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24 font-mono" style={{ color: "#9CA3AF", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            // NO_RECORDS_FOUND :: QUERY_RETURNED_NULL
          </div>
        )}
      </div>
    </div>
  );
}
