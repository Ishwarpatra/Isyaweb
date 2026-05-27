import { Link } from "react-router";
import { Mic, Handshake, Users, ArrowUpRight } from "lucide-react";

export function CollaborationSection() {
  const categories = [
    {
      title: "Guest Speaker",
      description: "Present your research or share industry insights at our global symposiums and workshops.",
      icon: Mic,
      tag: "COMMUNICATE // ADVOCATE",
      link: "/faqs#collaboration",
    },
    {
      title: "Research Partner",
      description: "Collaborate on aerospace studies, dataset analyses, or joint student CubeSat campaigns.",
      icon: Handshake,
      tag: "INVESTIGATE // PUBLISH",
      link: "/faqs#collaboration",
    },
    {
      title: "Mentor",
      description: "Provide career path advice and academic guidance to young cadets starting their journey.",
      icon: Users,
      tag: "ENGAGE // INSTRUCT",
      link: "/mentor",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#05080F]/60 border-y border-white/5">
      {/* Glow shapes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[10px] text-pink-500 tracking-[0.3em] uppercase">// STRATEGIC_ALLIANCES</span>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
            Help Us Guide the Future: Collaborate with ISYA.
          </h2>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            We partner with space agencies, observatories, academic laboratories, and industry professionals to empower the next generation.
          </p>
        </div>

        {/* Grid of Partners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((partner) => {
            const Icon = partner.icon;
            return (
              <div 
                key={partner.title}
                className="group relative rounded-2xl p-8 bg-gray-950/70 border border-white/5 hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)] transition-all duration-300 flex flex-col h-full hud-corners"
              >
                {/* HUD Accent Corner Details */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 rounded-tl group-hover:border-pink-500/40 transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 rounded-br group-hover:border-pink-500/40 transition-colors" />

                <span className="font-mono text-[9px] text-gray-500 tracking-wider mb-6 block">
                  {partner.tag}
                </span>

                <div className="w-12 h-12 rounded-xl bg-pink-500/5 border border-pink-500/20 text-pink-500 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-pink-500/10 transition-all duration-300">
                  <Icon size={22} />
                </div>

                <h3 className="text-white text-lg font-bold mb-3 tracking-wide group-hover:text-pink-400 transition-colors">
                  {partner.title}
                </h3>
                
                <p className="text-gray-400 text-xs leading-relaxed mb-8 flex-1">
                  {partner.description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <Link 
                    to={partner.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-pink-500 group-hover:text-pink-400 transition-colors"
                  >
                    ESTABLISH_LINK
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
