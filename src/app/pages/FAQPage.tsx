import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { Search, ChevronDown, HelpCircle, ArrowRight, BookOpen, Layers } from "lucide-react";
import { mockDb, FAQ } from "../utils/mockDb";

const CATEGORIES = ["ALL", "GENERAL", "MEMBERSHIP", "COMMUNITY", "MENTORSHIP", "ADMIN"];

export function FAQPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Load from local database on mount
  useEffect(() => {
    setFaqs(mockDb.getFAQs());
  }, []);

  // Listen to hash updates (e.g. #collaboration)
  useEffect(() => {
    if (location.hash === "#collaboration") {
      setActiveCategory("ALL");
      setSearchQuery("collaborate");
      // Expand matching questions
      const matching = mockDb.getFAQs().filter(
        f => f.question.toLowerCase().includes("collaborate") || 
             f.answer.toLowerCase().includes("collaborate")
      );
      const newExpanded: Record<number, boolean> = {};
      matching.forEach(m => {
        newExpanded[m.id] = true;
      });
      setExpandedIds(newExpanded);
    }
  }, [location.hash, faqs]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    filteredFAQs.forEach((faq) => {
      allExpanded[faq.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedIds({});
  };

  // Filter FAQs based on search and active category
  const filteredFAQs = faqs.filter((faq) => {
    const categoryMatches = activeCategory === "ALL" || faq.category === activeCategory;
    const searchMatches =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatches && searchMatches;
  });

  return (
    <main className="min-h-screen bg-[#070B14] stardust pb-24 pt-28 relative overflow-hidden">
      {/* Dynamic ambient particles / glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-pink-500 tracking-[0.25em] uppercase">
            // ORBITAL_DATABASE // CENTRAL_FAQ
          </span>
          <h1 className="text-white text-4xl font-extrabold tracking-tight mt-2 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Search our centralized coordinates for guides regarding membership enlisting, telemetry controls, and collaborations.
          </p>
        </div>

        {/* Controls Layout */}
        <div className="space-y-6 mb-10">
          
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Query FAQ database (e.g. 'membership', 'mentor')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-950/70 border border-white/5 text-white placeholder-gray-500 text-sm focus:border-pink-500/50 focus:shadow-[0_0_20px_rgba(236,72,153,0.15)] outline-none transition-all duration-300"
            />
          </div>

          {/* Categories Tab and Global Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ Categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    handleCollapseAll();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                      : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Global Expand/Collapse buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExpandAll}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-mono text-[10px] font-bold tracking-widest cursor-pointer transition-colors"
              >
                EXPAND_ALL
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-mono text-[10px] font-bold tracking-widest cursor-pointer transition-colors"
              >
                COLLAPSE_ALL
              </button>
            </div>
          </div>
        </div>

        {/* Accordions List */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => {
              const isExpanded = !!expandedIds[faq.id];
              return (
                <div 
                  key={faq.id}
                  className={`glass-card rounded-2xl border transition-all duration-300 ${
                    isExpanded ? "border-pink-500/25 bg-pink-500/2" : "border-white/5 bg-white/2 hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle size={16} className={isExpanded ? "text-pink-500" : "text-gray-500"} />
                      <span className="text-white text-sm font-semibold tracking-wide pr-4">
                        {faq.question}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="font-mono text-[9px] text-gray-600 bg-white/5 px-2 py-0.5 rounded border border-white/5 hidden sm:inline">
                        {faq.category}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180 text-pink-500" : ""}`} 
                      />
                    </div>
                  </button>
                  
                  {/* Expanded panel content */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-[500px] border-t border-white/5 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 py-5 space-y-4">
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {faq.answer}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[9px] text-gray-500">
                        <span>POSTED_BY // {faq.createdBy}</span>
                        <span>LAST_UPDATE // {faq.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl bg-white/2 border border-white/5">
            <Layers className="mx-auto text-gray-600 mb-4" size={32} />
            <p className="font-mono text-xs text-gray-500">NO_RECORDS_FOUND // ZERO_COORDINATE_MATCH</p>
            <p className="text-gray-400 text-sm mt-1">Try refining your keyword queries or selecting another sector.</p>
          </div>
        )}

        {/* Contact Help CTA */}
        <div className="mt-16 text-center bg-gray-950/40 border border-white/5 rounded-2xl p-8 relative overflow-hidden hud-corners">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-pink-500/30 rounded-tl" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-pink-500/30 rounded-br" />
          <h3 className="text-white font-bold text-lg mb-2">Still need support coords?</h3>
          <p className="text-gray-400 text-xs max-w-md mx-auto mb-6">
            If you couldn't find the answers in our central index collections, send a transmission directly to our flight officers.
          </p>
          <a
            href="mailto:general@isya.space"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-500 text-white hover:bg-pink-500/90 text-xs font-mono font-bold tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.3)]"
          >
            TRANSMIT_SUPPORT_SIGNAL →
          </a>
        </div>

      </div>
    </main>
  );
}
