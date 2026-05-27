import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, HelpCircle } from "lucide-react";
import { mockDb } from "../utils/mockDb";

export function FAQPreview() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // Fetch top 3 FAQs
  const allFAQs = mockDb.getFAQs();
  const topFAQs = allFAQs.slice(0, 3);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 relative bg-gradient-to-b from-transparent to-[#05080F]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title block */}
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] text-pink-500 tracking-[0.25em] uppercase">// DATA_TRANSMISSIONS // FAQ</span>
          <h2 className="text-white text-3xl font-extrabold tracking-tight mt-1">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm mt-2">
            Quick coordinates on how the ISYA Space Portal functions.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {topFAQs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`glass-card rounded-xl border transition-all duration-300 ${
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
                    <span className="text-white text-sm font-semibold tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180 text-pink-500" : ""}`} 
                  />
                </button>
                
                {/* Accordion panel container */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-[300px] border-t border-white/5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 py-5 text-gray-400 text-xs leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full FAQ Link */}
        <div className="text-center mt-10">
          <Link
            to="/faqs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-pink-500/20 bg-pink-500/5 text-white hover:bg-pink-500/10 hover:border-pink-500/40 text-xs font-mono font-bold tracking-widest transition-all cursor-pointer"
          >
            VIEW_ALL_FAQS_DATABASE →
          </Link>
        </div>
      </div>
    </section>
  );
}
