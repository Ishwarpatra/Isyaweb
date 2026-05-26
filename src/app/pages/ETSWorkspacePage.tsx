import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ClipboardCopy, Send, Terminal, Loader2, Maximize2, Minimize2 } from "lucide-react";

// Types
interface TelemetryLog {
  id: string;
  role: "user" | "system" | "agent";
  content: string;
  timestamp: string;
  hasCode?: boolean;
}

// Stardust Noise Overlay Component
const StardustOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 mix-blend-screen opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}
  />
);

// Custom Orbital Loader
const OrbitalLoader = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin" style={{ animationDuration: '2s' }}>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
    <circle cx="12" cy="4" r="2" fill="currentColor" />
  </svg>
);

// HUD Bracket Container
const HUDContainer = ({ children, className = "", glowingBorder = "blue" }: { children: React.ReactNode, className?: string, glowingBorder?: "blue" | "pink" | "orange" }) => {
  const glowColor = glowingBorder === "blue" ? "rgba(59,130,246,0.5)" : glowingBorder === "pink" ? "rgba(236,72,153,0.5)" : "rgba(249,115,22,0.5)";
  
  return (
    <div className={`relative group ${className}`}>
      {/* HUD Brackets (Top Left, Top Right, Bottom Left, Bottom Right) */}
      <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/40 pointer-events-none transition-colors group-focus-within:border-white" />
      <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/40 pointer-events-none transition-colors group-focus-within:border-white" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/40 pointer-events-none transition-colors group-focus-within:border-white" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/40 pointer-events-none transition-colors group-focus-within:border-white" />
      
      {/* Container background and stroke */}
      <div className="w-full h-full bg-[#111827]/40 backdrop-blur-[16px] border-t border-t-white/20 border-x-white/5 border-b-transparent p-4 relative"
           style={{
             boxShadow: `0 0 24px ${glowColor}00`,
             clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
           }}>
        <div className="absolute inset-0 transition-shadow duration-300 group-focus-within:shadow-[0_0_24px_var(--glow)]" 
             style={{ '--glow': glowColor } as any} />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

// Telemetry Button
const TelemetryButton = ({ children, onClick, variant = "primary", icon: Icon, disabled = false, className = "" }: any) => {
  const baseClasses = "relative flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm tracking-tighter uppercase transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EC4899]";
  
  const variants = {
    primary: "bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/30 hover:bg-[#EC4899]/20 hover:border-[#EC4899] hover:shadow-[0_0_24px_rgba(236,72,153,0.6)]",
    secondary: "bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 hover:bg-[#3B82F6]/20 hover:border-[#3B82F6] hover:shadow-[0_0_24px_rgba(59,130,246,0.6)]",
    outline: "bg-transparent text-white/70 border border-white/20 hover:bg-white/5 hover:text-white hover:border-white/50"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variants[variant as keyof typeof variants]} ${className}`}
      style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
    >
      {Icon && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />}
      {children}
    </button>
  );
};

export const ETSWorkspacePage = () => {
  const [logs, setLogs] = useState<TelemetryLog[]>([
    {
      id: "log-sys-0",
      role: "system",
      content: "// SYSTEM_STATUS: ONLINE\n// ETS_GEM_MODULE: v4.0.1_INITIALIZED\n// AWAITING_TELEMETRY_DATA_STREAM...",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const endOfLogsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfLogsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleProcess = async () => {
    if (!input.trim() || isProcessing) return;

    const newLog: TelemetryLog = {
      id: `log-user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };

    setLogs(prev => [...prev, newLog]);
    setInput("");
    setIsProcessing(true);

    // Simulate Agent processing
    setTimeout(() => {
      const agentResponse: TelemetryLog = {
        id: `log-agent-${Date.now()}`,
        role: "agent",
        hasCode: true,
        content: `{\n  "status": "ANOMALY_DETECTED",\n  "system": "LIFE_SUPPORT_O2",\n  "variance": "-4.2%",\n  "severity": "CRITICAL",\n  "recommendation": "INITIATE_AUX_VALVE_OVERRIDE"\n}`,
        timestamp: new Date().toISOString()
      };
      setLogs(prev => [...prev, agentResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleProcess();
    }
    if (e.key === 'Escape') {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#FFFFFF] font-sans selection:bg-[#EC4899]/30 relative overflow-hidden flex flex-col">
      <StardustOverlay />
      
      {/* Navbar / Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-[24px] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo mark placeholder */}
          <div className="w-10 h-10 border border-[#3B82F6]/50 flex items-center justify-center text-[#3B82F6] hover:scale-105 hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all cursor-pointer"
               style={{ clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" }}>
            <Terminal size={20} />
          </div>
          <div>
            <h1 className="text-lg font-medium tracking-wide">ISYA Exo-Telemetry Synthesizer</h1>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>// GEM_STATUS: OPERATIONAL</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono text-[#9CA3AF] mr-4 hidden md:block">
            [DATELOG: 2026.05.21]
          </div>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-[#9CA3AF] hover:text-white transition-colors">
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className={`flex-1 flex flex-col mx-auto w-full transition-all duration-500 ${isFullscreen ? 'max-w-full px-8' : 'max-w-4xl px-4'} py-8 gap-6`}>
        
        {/* Output Log Area */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`flex flex-col gap-2 ${log.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[10px] font-mono text-[#9CA3AF]/60 tracking-wider flex gap-3">
                  <span>{log.role === 'user' ? 'CMD_INPUT' : log.role === 'system' ? 'SYS_LOG' : 'GEM_OUTPUT'}</span>
                  <span>{log.timestamp.split('T')[1].substring(0,8)}</span>
                </div>
                
                {log.role === 'user' ? (
                  <div className="max-w-[80%] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#E2E8F0] px-4 py-3 font-mono text-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                       style={{ clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}>
                    {log.content}
                  </div>
                ) : log.role === 'agent' && log.hasCode ? (
                  <HUDContainer className="max-w-full w-full" glowingBorder="orange">
                    <div className="group relative">
                      <button 
                              onClick={() => {
                                navigator.clipboard.writeText(log.content);
                                // Optional: add toast or visual feedback here
                              }}
                              className="absolute top-2 right-2 p-2 bg-[#0B0F19] text-[#9CA3AF] border border-white/10 hover:border-[#F97316] hover:text-[#F97316] hover:shadow-[0_0_12px_rgba(249,115,22,0.6)] transition-all z-20 cursor-pointer active:scale-95"
                              title="Copy to Clipboard">
                        <ClipboardCopy size={16} />
                      </button>
                      <pre className="font-mono text-sm text-[#3B82F6] overflow-x-auto p-4 bg-[#0B0F19]/50 border border-white/5 whitespace-pre-wrap leading-relaxed">
                        {log.content}
                      </pre>
                    </div>
                  </HUDContainer>
                ) : (
                  <div className="font-mono text-sm text-[#10B981] whitespace-pre-wrap">
                    {log.content}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={endOfLogsRef} />
        </div>

        {/* Input Area */}
        <div className="relative pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
              <span>// INJECT_TELEMETRY_LOG</span>
              <div className="flex items-center gap-2">
                {isProcessing && (
                  <div className="flex items-center gap-2 text-[#EC4899]">
                    <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-ping" />
                    <span>PARSING_ANOMALIES...</span>
                  </div>
                )}
                <span className="hidden sm:inline opacity-50">Cmd/Ctrl + Enter to Execute</span>
              </div>
            </div>
            
            <HUDContainer glowingBorder="blue" className="w-full">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 400)}px`;
                }}
                onKeyDown={handleKeyDown}
                placeholder="Paste raw JSON/XML telemetry log here..."
                className="w-full bg-transparent text-[#FFFFFF] font-mono text-sm border-none outline-none resize-none min-h-[120px] overflow-y-auto placeholder:text-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EC4899] leading-relaxed"
                spellCheck={false}
              />
            </HUDContainer>
            
            <div className="flex justify-end mt-2">
              <TelemetryButton 
                onClick={handleProcess} 
                disabled={!input.trim() || isProcessing}
                variant="primary"
                icon={isProcessing ? OrbitalLoader : Send}
                className={isProcessing ? "animate-pulse" : ""}
              >
                {isProcessing ? "PROCESSING" : "SYNTHESIZE"}
              </TelemetryButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
