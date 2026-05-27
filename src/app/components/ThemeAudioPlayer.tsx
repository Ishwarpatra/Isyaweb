import { useState, useEffect, useRef } from "react";
import { Play, Pause, X, Radio, Tv } from "lucide-react";
import { toast } from "sonner";

export function ThemeAudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  // Sync play/pause state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay block or playback interrupted:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isOpen]);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleLaunch = () => {
    setIsOpen(true);
    setIsPlaying(true);
    setIsMuted(false);
    toast.success("Initiating broadcast channel... ISYA Theme Music Video active.");
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPlaying(false);
  };

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Floating Hero CTA Trigger */}
      {!isOpen && (
        <button
          onClick={handleLaunch}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full bg-[#05080F]/90 border border-pink-500/30 text-white hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all group cursor-pointer active:scale-95"
          aria-label="Launch ISYA Theme Music Video"
        >
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-500 items-center justify-center text-[7px] text-white">
              <Radio size={8} />
            </span>
          </span>
          <span className="font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
            THEME_BROADCAST
            <Tv size={12} className="text-pink-500 group-hover:rotate-12 transition-transform" />
          </span>
        </button>
      )}

      {/* Futuristic Floating HUD Music Video Player */}
      {isOpen && (
        <div
          ref={playerRef}
          className="fixed bottom-6 right-6 z-40 w-80 bg-gray-950/95 border border-pink-500/25 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hud-corners animate-slide-up"
          role="dialog"
          aria-label="ISYA Theme Music Video Player"
        >
          {/* HUD Line details */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-pink-500/30 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-pink-500/30 rounded-tr-lg" />
          
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Radio size={14} className="text-pink-500 animate-pulse" />
              <span className="font-mono text-[10px] text-gray-400 tracking-wider font-semibold">
                SIGNAL_RECEIVER // ACTIVE
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1 rounded text-gray-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Terminate broadcast stream"
            >
              <X size={14} />
            </button>
          </div>

          {/* Embedded Video Player */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/isya-theme.mp4"
              loop
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-30"}`}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 bg-black/60 pointer-events-none">
                <Tv size={28} className="text-pink-500" />
                <span className="font-mono text-[10px]">STREAM_PAUSED</span>
              </div>
            )}
          </div>

          {/* Player controls */}
          <div className="p-4 flex items-center justify-between gap-4 bg-white/1">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 h-9 w-9 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                aria-label={isPlaying ? "Pause theme stream" : "Play theme stream"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
              <div>
                <h4 className="text-white text-xs font-bold leading-tight font-mono tracking-tight truncate max-w-[120px]">
                  ISYA_THEME.MP4
                </h4>
                <p className="text-gray-500 text-[9px] font-mono mt-0.5">
                  VOL: {isMuted ? "MUTED" : "100%"}
                </p>
              </div>
            </div>

            {/* Toggle Audio Mute */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] font-bold tracking-widest transition-all cursor-pointer ${
                isMuted 
                  ? "border-pink-500/20 text-pink-500/70 bg-pink-500/5 hover:bg-pink-500/10" 
                  : "border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10"
              }`}
            >
              {isMuted ? "UNMUTE_AUDIO" : "MUTE_AUDIO"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
