import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Webinar } from "../utils/mockDb";

interface WebinarCarouselProps {
  webinars: Webinar[];
}

export function WebinarCarousel({ webinars }: WebinarCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  // Responsive logic for cards visible per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(webinars.length - cardsPerView, prev + 1));
  };

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (lightboxVideo) {
      document.body.style.overflow = "hidden";
      lightboxCloseRef.current?.focus();
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxVideo(null);
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [lightboxVideo]);

  if (!webinars || webinars.length === 0) return null;

  const maxIndex = Math.max(0, webinars.length - cardsPerView);
  const transformPercent = -(currentIndex * (100 / cardsPerView));

  return (
    <section className="py-20 relative bg-[#060B14]/40 border-y border-[#4A90E2]/10 overflow-hidden">
      {/* Decorative stars / lines background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] text-pink-500 tracking-[0.2em] uppercase">// BRIEFINGS_&_SEMINARS</span>
            <h2 className="text-white text-3xl font-extrabold tracking-tight mt-1">Past Webinars</h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl">
              Access the data archives of our international symposiums, engineering guides, and expert Q&As.
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                currentIndex === 0 
                  ? "border-white/5 text-gray-600 bg-white/1 cursor-not-allowed" 
                  : "border-pink-500/20 text-white bg-pink-500/5 hover:bg-pink-500/10 hover:border-pink-500/40"
              }`}
              aria-label="Previous Webinars"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                currentIndex >= maxIndex
                  ? "border-white/5 text-gray-600 bg-white/1 cursor-not-allowed" 
                  : "border-pink-500/20 text-white bg-pink-500/5 hover:bg-pink-500/10 hover:border-pink-500/40"
              }`}
              aria-label="Next Webinars"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="relative overflow-hidden -mx-4 px-4">
          <div 
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{ 
              transform: `translateX(${transformPercent}%)`,
              width: `${(webinars.length / cardsPerView) * 100}%`
            }}
          >
            {webinars.map((webinar) => (
              <div 
                key={webinar.id} 
                className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-pink-500/30 hover:shadow-[0_0_25px_rgba(236,72,153,0.15)] transition-all group relative cursor-pointer"
                style={{ width: `calc(${100 / webinars.length}% - 1.5rem)` }}
                onClick={() => setLightboxVideo(getYouTubeId(webinar.videoUrl))}
              >
                {/* HUD Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-pink-500/30 rounded-tl" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-pink-500/30 rounded-tr" />
                
                {/* Video Image Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback 
                    src={webinar.image} 
                    alt={webinar.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500 text-pink-500 flex items-center justify-center group-hover:scale-110 shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all">
                      <Play size={20} className="fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                    DATE_LOGGED // {webinar.date}
                  </span>
                  <h3 className="text-white font-bold leading-snug mt-2 group-hover:text-pink-400 transition-colors line-clamp-2">
                    {webinar.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mt-2 line-clamp-2">
                    {webinar.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-pink-500 tracking-widest uppercase">
                      STREAM_BROADCAST
                    </span>
                    <span className="text-pink-500 text-xs font-mono group-hover:translate-x-1 transition-transform">
                      LAUNCH_PLAYER →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {lightboxVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <button
            ref={lightboxCloseRef}
            onClick={() => setLightboxVideo(null)}
            className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X size={32} />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${lightboxVideo}?autoplay=1`}
              title="YouTube Video Archive Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
